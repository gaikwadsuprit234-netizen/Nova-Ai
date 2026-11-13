import { useEffect, useRef, useState } from 'react'
import { Activity, ArrowUp, Bot, ChevronDown, CircleHelp, Command, Cpu, Menu, MessageSquare, Moon, Plus, Settings2, ShieldCheck, Sparkles, Sun, Trash2, X } from 'lucide-react'
import { getProviders, sendMessage } from './api'
import type { ChatMessage, Provider, ProviderStatus } from './types'

const newId = () => crypto.randomUUID()
const initial: ChatMessage[] = []

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>(initial)
  const [input, setInput] = useState('')
  const [provider, setProvider] = useState<Provider>('gemini')
  const [providers, setProviders] = useState<ProviderStatus[]>([])
  const [conversationId, setConversationId] = useState(newId)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [light, setLight] = useState(false)
  const [sidebar, setSidebar] = useState(true)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => { getProviders().then(setProviders).catch(() => setError('Backend is not reachable. Start the FastAPI server.')) }, [])
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, busy])

  async function submit(text = input) {
    const clean = text.trim()
    if (!clean || busy) return
    setError('')
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: clean }])
    setBusy(true)
    try {
      const result = await sendMessage(conversationId, clean, provider)
      setMessages(prev => [...prev, { role: 'assistant', content: result.reply, provider: result.provider, model: result.model }])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally { setBusy(false) }
  }

  function newChat() { setMessages([]); setConversationId(newId()); setError('') }

  const configured = providers.find(p => p.id === provider)?.configured ?? false
  return (
    <div className={light ? 'app light' : 'app'}>
      <aside className={sidebar ? 'sidebar' : 'sidebar collapsed'}>
        <div className="brand"><div className="brand-mark"><Sparkles size={19}/></div><div><b>NOVA</b><small>INTELLIGENCE BEYOND LIMITS</small></div><button className="icon-btn mobile-only" onClick={() => setSidebar(false)}><X size={17}/></button></div>
        <button className="new-chat" onClick={newChat}><Plus size={17}/> New conversation <span>⌘ K</span></button>
        <div className="side-label">WORKSPACE</div>
        <button className="side-link active"><MessageSquare size={17}/> Chat</button>
        <button className="side-link" title="Not implemented in this starter"><Cpu size={17}/> AI Models <span className="soon">Soon</span></button>
        <button className="side-link" title="Not implemented in this starter"><Activity size={17}/> Research <span className="soon">Soon</span></button>
        <div className="side-bottom">
          <div className="privacy"><ShieldCheck size={16}/><div><b>Private by design</b><small>API keys stay on your server</small></div></div>
          <button className="side-link"><Settings2 size={17}/> Settings <span className="soon">Soon</span></button>
          <button className="side-link"><CircleHelp size={17}/> Help & support</button>
          <div className="profile"><div className="avatar">N</div><div><b>NOVA Workspace</b><small>Local development</small></div><button className="icon-btn" onClick={() => setLight(!light)}>{light ? <Moon size={16}/> : <Sun size={16}/>}</button></div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="top-left"><button className="icon-btn" onClick={() => setSidebar(!sidebar)}><Menu size={18}/></button><span className="crumb">Workspace</span><span className="slash">/</span><b>New chat</b></div>
          <div className="top-right"><span className="status-dot"/><span className="status-text">SYSTEM ONLINE</span><button className="icon-btn"><Command size={17}/></button></div>
        </header>

        <section className="chat-area">
          {messages.length === 0 ? <div className="welcome">
            <div className="orb"><div className="orb-inner"><Sparkles size={30}/></div></div>
            <div className="eyebrow"><span/> YOUR INTELLIGENCE, AMPLIFIED</div>
            <h1>Think beyond<br/><em>the ordinary.</em></h1>
            <p>One workspace. Multiple AI models. A clearer way to get things done.</p>
            <div className="suggestions">
              {[
                ['01','Explore an idea','Help me turn a rough idea into a clear plan.'],
                ['02','Write something','Draft a professional email about a project update.'],
                ['03','Solve a problem','Break down a difficult technical problem step by step.'],
              ].map(([n,title,prompt]) => <button className="suggestion" key={n} onClick={() => submit(prompt)}><span>{n}</span><div><b>{title}</b><small>{prompt}</small></div><ArrowUp size={15}/></button>)}
            </div>
          </div> : <div className="messages">{messages.map((m,i) => <article className={`message ${m.role}`} key={i}><div className="message-avatar">{m.role === 'assistant' ? <Sparkles size={16}/> : 'Y'}</div><div className="message-body"><div className="message-heading">{m.role === 'assistant' ? 'NOVA AI' : 'YOU'}{m.model && <span>{m.provider} · {m.model}</span>}</div><div className="message-content">{m.content}</div></div></article>)}{busy && <article className="message assistant"><div className="message-avatar"><Sparkles size={16}/></div><div className="message-body"><div className="message-heading">NOVA AI</div><div className="typing"><i/><i/><i/></div></div></article>}<div ref={endRef}/></div>}
        </section>

        <div className="composer-wrap">
          {error && <div className="error"><span>{error}</span><button onClick={() => setError('')}><X size={14}/></button></div>}
          <div className="composer">
            <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit() } }} placeholder="Ask NOVA anything..." rows={1}/>
            <div className="composer-bottom">
              <div className="composer-tools">
                <div className="provider-select"><Bot size={15}/><select value={provider} onChange={e => setProvider(e.target.value as Provider)}><option value="gemini">Gemini</option><option value="openai">OpenAI</option><option value="anthropic">Claude</option></select><ChevronDown size={13}/></div>
                <span className={configured ? 'configured' : 'not-configured'}>{configured ? 'READY' : 'KEY NEEDED'}</span>
              </div>
              <button className="send" onClick={() => submit()} disabled={busy || !input.trim()} aria-label="Send message"><ArrowUp size={18}/></button>
            </div>
          </div>
          <div className="disclaimer">NOVA can make mistakes. Verify important information. <span>·</span> <b>Selected provider is used directly; no automatic paid fallback.</b></div>
        </div>
      </main>
    </div>
  )
}
