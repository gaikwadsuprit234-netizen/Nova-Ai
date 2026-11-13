from pathlib import Path
import json
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import select
from .config import settings
from .database import Base, engine, get_db
from .models import Message
from .schemas import ChatRequest, ChatResponse
from .providers import generate_reply, ProviderNotConfigured

Base.metadata.create_all(bind=engine)
app = FastAPI(title=settings.app_name, version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization"],
)

@app.get("/health")
def health():
    return {"status": "ok", "app": settings.app_name, "environment": settings.environment}

@app.get("/api/capabilities")
def capabilities():
    """Return honest implementation states; the UI must not invent feature availability."""
    path = Path(__file__).with_name("capabilities.json")
    return json.loads(path.read_text(encoding="utf-8"))

@app.get("/api/providers")
def providers():
    return {
        "providers": [
            {"id": "openai", "configured": bool(settings.openai_api_key), "model": settings.openai_model},
            {"id": "gemini", "configured": bool(settings.gemini_api_key), "model": settings.gemini_model},
            {"id": "anthropic", "configured": bool(settings.anthropic_api_key), "model": settings.anthropic_model},
        ]
    }

@app.get("/api/conversations/{conversation_id}")
def get_conversation(conversation_id: str, db: Session = Depends(get_db)):
    rows = db.scalars(select(Message).where(Message.conversation_id == conversation_id).order_by(Message.id)).all()
    return [{"role": row.role, "content": row.content, "provider": row.provider, "model": row.model} for row in rows]

@app.post("/api/chat", response_model=ChatResponse)
async def chat(payload: ChatRequest, db: Session = Depends(get_db)):
    db.add(Message(conversation_id=payload.conversation_id, role="user", content=payload.message))
    db.commit()
    try:
        reply, model = await generate_reply(payload.provider, payload.message)
    except ProviderNotConfigured as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    except Exception as exc:
        # Avoid returning provider internals or secrets to the browser.
        raise HTTPException(status_code=502, detail=f"{payload.provider} request failed. Check backend logs and provider status.") from exc
    db.add(Message(conversation_id=payload.conversation_id, role="assistant", content=reply,
                   provider=payload.provider, model=model))
    db.commit()
    return ChatResponse(conversation_id=payload.conversation_id, reply=reply, provider=payload.provider, model=model)
