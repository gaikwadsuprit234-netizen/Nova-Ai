from .config import settings

class ProviderNotConfigured(Exception):
    pass

async def generate_reply(provider: str, prompt: str) -> tuple[str, str]:
    """Call exactly the selected provider. Never silently fall back."""
    if provider == "openai":
        if not settings.openai_api_key:
            raise ProviderNotConfigured("OpenAI API key is not configured.")
        from openai import AsyncOpenAI
        client = AsyncOpenAI(api_key=settings.openai_api_key)
        response = await client.chat.completions.create(
            model=settings.openai_model,
            messages=[{"role": "system", "content": "You are NOVA AI. Be accurate, direct, and transparent about uncertainty."},
                      {"role": "user", "content": prompt}],
        )
        return (response.choices[0].message.content or ""), settings.openai_model

    if provider == "gemini":
        if not settings.gemini_api_key:
            raise ProviderNotConfigured("Gemini API key is not configured.")
        from google import genai
        client = genai.Client(api_key=settings.gemini_api_key)
        response = await client.aio.models.generate_content(
            model=settings.gemini_model,
            contents=prompt,
        )
        return (response.text or ""), settings.gemini_model

    if provider == "anthropic":
        if not settings.anthropic_api_key:
            raise ProviderNotConfigured("Anthropic API key is not configured.")
        from anthropic import AsyncAnthropic
        client = AsyncAnthropic(api_key=settings.anthropic_api_key)
        response = await client.messages.create(
            model=settings.anthropic_model,
            max_tokens=2048,
            system="You are NOVA AI. Be accurate, direct, and transparent about uncertainty.",
            messages=[{"role": "user", "content": prompt}],
        )
        text = "".join(block.text for block in response.content if getattr(block, "type", "") == "text")
        return text, settings.anthropic_model

    raise ValueError("Unsupported provider.")
