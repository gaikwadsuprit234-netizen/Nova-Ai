# NOVA AI — Intelligence Beyond Limits

A runnable, free-tier-first starter for a multi-provider AI assistant.

## What is implemented
- React + TypeScript + Vite chat interface
- FastAPI backend with health and chat endpoints
- OpenAI, Google Gemini, and Anthropic provider adapters (official APIs)
- Explicit provider/model selection; no silent paid-provider fallback
- PostgreSQL configuration with SQLite development fallback
- Conversation persistence, basic error handling, and tests
- Responsive dark UI and environment-based secrets

## Not yet production-complete
Autonomous tool execution, web search/research, live sports/weather/market feeds, voice, vision workflows, advanced file analysis, data analyst, sandboxed coding agent, long-term memory controls, OAuth, billing, and deployment hardening remain future milestones. UI placeholders are not represented as working integrations.

## Requirements
- Node.js 20+
- Python 3.11+
- An API key for at least one provider to receive real model responses

## Run locally

### Backend (Windows PowerShell)
```powershell
cd backend
py -3.11 -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
# Add one provider API key to backend/.env
uvicorn app.main:app --reload
```

### Backend (macOS/Linux)
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

Backend: http://localhost:8000  
API docs: http://localhost:8000/docs

### Frontend
In another terminal:
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
Open the Vite URL shown in the terminal (normally http://localhost:5173).

## Provider setup
Add keys only to `backend/.env`:
- `OPENAI_API_KEY`
- `GEMINI_API_KEY`
- `ANTHROPIC_API_KEY`

Do not put provider keys in frontend files or commit `.env`.

The model names are configurable in `backend/.env`. API access and pricing depend on your provider account. Consumer subscriptions do not automatically provide API credits.

## Database
Default local mode uses SQLite at `backend/nova.db`. For PostgreSQL, set `DATABASE_URL` to a PostgreSQL SQLAlchemy URL, for example:
`postgresql+psycopg://nova_user:your_password@localhost:5432/nova_ai`

## Verify
```bash
cd backend
pytest
```
```bash
cd frontend
npm run build
```

## Security status
This is a development starter, not a public-production deployment. Before exposing it publicly, add authentication, per-user authorization, CSRF protections where applicable, stronger rate limiting, secret management, monitoring, and a security review.


## NOVA AI 2.0 unified feature plan
See `docs/UNIFIED_FEATURE_SPEC_V2.md` for the combined ChatGPT/Gemini/Claude-inspired feature catalogue, UI direction, safety requirements, capability states, and delivery order.

The backend exposes:
- `GET /api/capabilities` — honest status of every planned/implemented capability.
- `GET /api/providers` — provider key configuration and default model.

The current ZIP is a foundation plus an implementation blueprint. It does **not** mean every item in the feature catalogue is already implemented. Features marked `planned` must be built and tested before being advertised as working.
