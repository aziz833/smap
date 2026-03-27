import React, { useMemo, useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Send, X, User } from 'lucide-react'

function TypingDots() {
  return (
    <div className="typing">
      <span />
      <span />
      <span />
    </div>
  )
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 'm0',
      from: 'bot',
      text: "Bonjour ! Je suis votre assistant IA 🤖\nComment puis-je vous aider aujourd'hui ?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const listRef = useRef(null)

  const canSend = useMemo(() => !loading && input.trim().length > 0, [loading, input])

  const scrollToBottom = () => {
    if (listRef.current) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    if (open) scrollToBottom()
  }, [messages, open, loading])

  const getSmartResponse = (text) => {
    const low = text.toLowerCase()
    
    if (low.includes('projet') || low.includes('project')) {
      return "Je peux vous aider à analyser votre projet !\nCliquez sur '+ Nouveau Projet' pour commencer l'analyse IA complète avec planification automatique."
    }
    if (low.includes('sprint')) {
      return "Vos sprints sont générés automatiquement par l'Agent Planning. Accédez à la page Planning pour voir le détail de chaque sprint."
    }
    if (low.includes('risque') || low.includes('risk')) {
      return "L'Agent Risque analyse automatiquement les risques de vos projets. Consultez l'onglet Risques dans le détail de votre projet."
    }
    if (low.includes('planning')) {
      return "Le planning est généré par l'IA en 3 étapes:\n1. Agent Analyse → extrait les requirements\n2. Agent Planning → génère les sprints\n3. Agent Risque → détecte les risques"
    }
    
    return "Bonjour ! Je suis votre assistant IA SMA.\nJe peux vous aider avec:\n• Analyse de projets\n• Génération de planning\n• Détection de risques\nQue souhaitez-vous faire ?"
  }

  const send = async (text) => {
    const content = String(text || '').trim()
    if (!content) return

    const userMsg = { 
      id: `u-${Date.now()}`, 
      from: 'user', 
      text: content,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    // Simulate typing
    setTimeout(() => {
      const botMsg = {
        id: `b-${Date.now()}`,
        from: 'bot',
        text: getSmartResponse(content),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages((prev) => [...prev, botMsg])
      setLoading(false)
    }, 1200)
  }

  return (
    <>
      <button className="chat-fab" onClick={() => setOpen(true)} aria-label="Ouvrir le chatbot">
        <Bot size={22} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{ zIndex: 10000 }}
            />
            <motion.aside
              className="chat-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="chat-top">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="chat-badge">
                    <Bot size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 16 }}>Assistant IA 🤖</div>
                    <div style={{ fontSize: 11, color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} /> En ligne
                    </div>
                  </div>
                </div>
                <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Fermer">
                  <X size={20} />
                </button>
              </div>

              <div className="chat-body" ref={listRef}>
                {messages.map((m) => (
                  <div key={m.id} className={`bubble-row ${m.from === 'user' ? 'right' : 'left'}`}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: '85%' }}>
                      <div className={`bubble ${m.from === 'user' ? 'user' : 'bot'}`}>
                        <div style={{ whiteSpace: 'pre-wrap' }}>{m.text}</div>
                      </div>
                      <span style={{ fontSize: 10, alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start', color: '#94A3B8', fontWeight: 600 }}>
                        {m.time}
                      </span>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="bubble-row left">
                    <div className="bubble bot">
                      <TypingDots />
                    </div>
                  </div>
                )}
              </div>

              <form
                className="chat-input"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (canSend) send(input)
                }}
              >
                <input
                  className="input"
                  style={{ height: 44 }}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Posez votre question..."
                  onKeyPress={(e) => e.key === 'Enter' && canSend && send(input)}
                />
                <button 
                  className="btn btn-primary" 
                  disabled={!canSend} 
                  type="submit"
                  style={{ width: 44, height: 44, padding: 0, borderRadius: 12 }}
                >
                  <Send size={18} />
                </button>
              </form>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

