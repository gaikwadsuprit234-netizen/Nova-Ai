import type { ChatMessage, Provider, ProviderStatus } from './types'

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export async function getProviders(): Promise<ProviderStatus[]> {
  const response = await fetch(`${API}/api/providers`)
  if (!response.ok) throw new Error('Could not load provider status')
  const data = await response.json()
  return data.providers
}

export async function getConversation(id: string): Promise<ChatMessage[]> {
  const response = await fetch(`${API}/api/conversations/${id}`)
  if (!response.ok) throw new Error('Could not load conversation')
  return response.json()
}

export async function sendMessage(conversationId: string, message: string, provider: Provider) {
  const response = await fetch(`${API}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ conversation_id: conversationId, message, provider }),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.detail || 'Request failed')
  return data as { reply: string; provider: string; model: string }
}
