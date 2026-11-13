export type Provider = 'openai' | 'gemini' | 'anthropic'
export type ChatMessage = { role: 'user' | 'assistant'; content: string; provider?: string; model?: string }
export type ProviderStatus = { id: Provider; configured: boolean; model: string }
