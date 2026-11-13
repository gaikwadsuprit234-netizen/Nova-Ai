from pydantic import BaseModel, Field

class ChatRequest(BaseModel):
    conversation_id: str = Field(min_length=1, max_length=64)
    message: str = Field(min_length=1, max_length=20000)
    provider: str = Field(default="gemini", pattern="^(openai|gemini|anthropic)$")

class ChatResponse(BaseModel):
    conversation_id: str
    reply: str
    provider: str
    model: str
