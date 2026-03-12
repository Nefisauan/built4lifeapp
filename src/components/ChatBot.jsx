import { useState, useRef, useEffect } from 'react'
import { X, Send, ChevronDown } from 'lucide-react'

const WELCOME = {
  role: 'assistant',
  content: "Hey! I'm Cosmo 🎓 — your AI tutor built into Built4Life.\n\nAsk me anything: help with a class, study strategies, BYU resources, or just need to talk through a tough week. I've got you.",
}

const SUGGESTIONS = [
  'Help me understand a concept',
  'Study tips for student-athletes',
  'What BYU resources are available?',
  'I need help with time management',
]

function MessageBubble({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-electric/20 border border-electric/30 flex items-center justify-center text-base shrink-0 mb-0.5">
          🎓
        </div>
      )}
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-electric text-navy-900 font-medium rounded-br-sm'
            : 'bg-navy-800 text-slate-100 border border-navy-600/40 rounded-bl-sm'
        }`}
      >
        {msg.content}
        {msg.streaming && (
          <span className="inline-block w-1.5 h-4 bg-electric/60 ml-0.5 align-middle animate-pulse rounded-sm" />
        )}
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="w-8 h-8 rounded-full bg-electric/20 border border-electric/30 flex items-center justify-center text-base shrink-0">
        🎓
      </div>
      <div className="bg-navy-800 border border-navy-600/40 rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-electric rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ChatBot({ open, onClose }) {
  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [showTyping, setShowTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, showTyping])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  const hasUserMessages = messages.some(m => m.role === 'user')

  const sendMessage = async (text) => {
    const content = text.trim()
    if (!content || isStreaming) return

    setInput('')
    setIsStreaming(true)
    setShowTyping(true)

    // Build API history from current messages (text only, skip welcome)
    const history = messages
      .slice(1) // skip welcome message
      .filter(m => m.content.trim())
      .map(m => ({ role: m.role, content: m.content }))

    const userMsg = { role: 'user', content }
    setMessages(prev => [...prev, userMsg])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...history, userMsg] }),
      })

      if (!response.ok) throw new Error('API error')
      if (!response.body) throw new Error('No stream')

      setShowTyping(false)

      // Add streaming assistant message
      setMessages(prev => [...prev, { role: 'assistant', content: '', streaming: true }])

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6)
          if (data === '[DONE]') continue

          try {
            const parsed = JSON.parse(data)
            if (parsed.text) {
              setMessages(prev => {
                const updated = [...prev]
                const last = updated[updated.length - 1]
                updated[updated.length - 1] = { ...last, content: last.content + parsed.text }
                return updated
              })
            }
            if (parsed.error) {
              setMessages(prev => {
                const updated = [...prev]
                updated[updated.length - 1] = {
                  role: 'assistant',
                  content: parsed.error,
                }
                return updated
              })
            }
          } catch {}
        }
      }

      // Remove streaming flag
      setMessages(prev => {
        const updated = [...prev]
        const last = updated[updated.length - 1]
        if (last?.streaming) {
          updated[updated.length - 1] = { ...last, streaming: false }
        }
        return updated
      })
    } catch {
      setShowTyping(false)
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "Sorry, I couldn't connect. Check your internet and try again." },
      ])
    } finally {
      setIsStreaming(false)
    }
  }

  return (
    <>
      {/* Chat overlay */}
      {open && (
        <div className="fixed inset-0 z-50 bg-navy-900 flex flex-col animate-fade-in">

          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-14 pb-4 border-b border-navy-700/60 shrink-0">
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-navy-800 transition-colors"
            >
              <ChevronDown size={22} className="text-slate-400" />
            </button>
            <div className="text-center">
              <p className="text-white font-bold text-base">Cosmo</p>
              <p className="text-electric text-xs font-medium">AI Tutor · Built4Life</p>
            </div>
            <button
              onClick={() => { setMessages([WELCOME]); setInput('') }}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-navy-800 transition-colors"
            >
              <X size={18} className="text-slate-500" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
            {messages.map((msg, i) => (
              <MessageBubble key={i} msg={msg} />
            ))}

            {showTyping && <TypingIndicator />}

            {/* Suggestion chips — only before first user message */}
            {!hasUserMessages && !isStreaming && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="px-3 py-1.5 rounded-full bg-navy-800 border border-navy-600/60 text-slate-300 text-xs hover:border-electric/40 hover:text-white transition-colors no-select"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          <div className="shrink-0 px-4 pb-10 pt-3 border-t border-navy-700/60 bg-navy-900">
            <div className="flex gap-2 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage(input)
                  }
                }}
                placeholder="Ask Cosmo anything..."
                rows={1}
                className="flex-1 bg-navy-800 border border-navy-600/40 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-500 outline-none focus:border-electric/50 resize-none leading-relaxed transition-colors"
                style={{ maxHeight: 120 }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isStreaming}
                className="w-11 h-11 bg-electric rounded-xl flex items-center justify-center shrink-0 disabled:opacity-40 no-select active:scale-95 transition-all"
              >
                <Send size={17} className="text-navy-900" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
