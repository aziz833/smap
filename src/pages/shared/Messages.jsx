import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Smile, Info, MoreVertical } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'

const MOCK_CONVERSATIONS = [
  {
    id: 1,
    otherUser: { name: 'Manager', role: 'manager', avatar: 'M', color: '#3B82F6' },
    unread: 2,
    messages: [
      { id: 1, text: 'Bonjour Aziz, le Sprint 1 commence demain', sender: 'manager', time: '10:00' },
      { id: 2, text: "N'oubliez pas la réunion à 10h", sender: 'manager', time: '10:01' },
      { id: 3, text: 'Bonjour, bien reçu !', sender: 'aziz', time: '10:05' },
      { id: 4, text: 'Je serai présent', sender: 'aziz', time: '10:05' }
    ]
  },
  {
    id: 2,
    otherUser: { name: 'Mohamed Amine', role: 'developer', avatar: 'MA', color: '#10B981' },
    unread: 0,
    messages: [
      { id: 1, text: "Amine, peux-tu terminer la tâche Auth aujourd'hui ?", sender: 'manager', time: '09:30' },
      { id: 2, text: "Oui bien sûr, je m'en occupe", sender: 'mohamed', time: '09:45' }
    ]
  }
]

export default function Messages() {
  const { user } = useAuth()
  const [activeConvId, setActiveConvId] = useState(MOCK_CONVERSATIONS[0].id)
  const [inputText, setInputText] = useState('')

  // The view depends on the role. For developer, mostly chatting with Manager.
  // For Manager, chatting with multiple developers.
  // Filtering for simplicity based on user role:
  const conversations = MOCK_CONVERSATIONS.filter(c => {
    if (user.role === 'manager') return c.otherUser.role !== 'manager'
    return c.otherUser.role === 'manager'
  })

  const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0]

  const getInitials = (name) => {
    const parts = String(name || '').trim().split(' ').filter(Boolean)
    const a = parts[0]?.[0] ?? 'U'
    const b = parts[1]?.[0] ?? ''
    return (a + b).toUpperCase()
  }

  const handleSend = (e) => {
    e?.preventDefault()
    if (!inputText.trim()) return
    // Mock send logic: in a real app, this would append to the unread messages, update DB, etc.
    setInputText('')
  }

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ height: 'calc(100vh - 140px)', padding: 0, display: 'flex' }}
    >
      <div className="card" style={{ flex: 1, display: 'flex', overflow: 'hidden', padding: 0 }}>
        
        {/* Left Panel: Conversations List */}
        <div style={{ width: 320, borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', background: 'var(--card)' }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>Messages</h2>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {conversations.map(conv => {
              const lastMsg = conv.messages[conv.messages.length - 1]
              const isActive = conv.id === activeConvId
              
              return (
                <div 
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  style={{ 
                    padding: '16px 24px', 
                    display: 'flex', 
                    gap: 16, 
                    cursor: 'pointer',
                    background: isActive ? 'var(--primary-soft)' : 'transparent',
                    borderBottom: '1px solid var(--border)',
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                >
                  {isActive && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: 'var(--primary)' }} />}
                  
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: conv.otherUser.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, flexShrink: 0 }}>
                    {conv.otherUser.avatar}
                  </div>
                  
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                      <span style={{ fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {conv.otherUser.name}
                      </span>
                      <span style={{ fontSize: 11, color: isActive ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 600 }}>
                        {lastMsg?.time}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {lastMsg?.text}
                    </div>
                  </div>

                  {conv.unread > 0 && (
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--danger)', color: '#fff', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                      {conv.unread}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Panel: Chat Window */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--card)' }}>
          {activeConv ? (
            <>
              {/* Chat Header */}
              <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: 42, height: 42, borderRadius: '50%', background: activeConv.otherUser.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800 }}>
                      {activeConv.otherUser.avatar}
                    </div>
                    <div style={{ position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, background: 'var(--success)', border: '2px solid var(--card)', borderRadius: '50%' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 800 }}>{activeConv.otherUser.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                      <span className="badge badge-blue">{activeConv.otherUser.role}</span>
                      <span style={{ fontSize: 12, color: 'var(--success)', fontWeight: 600 }}>En ligne</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="icon-btn" style={{ background: 'var(--bg)', color: 'var(--text-muted)' }}><Info size={20} /></button>
                  <button className="icon-btn" style={{ background: 'var(--bg)', color: 'var(--text-muted)' }}><MoreVertical size={20} /></button>
                </div>
              </div>

              {/* Chat Area */}
              <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 24, background: '#F8FAFC' }}>
                <div style={{ textAlign: 'center', margin: '16px 0' }}>
                  <span style={{ background: 'var(--border)', color: 'var(--text)', padding: '4px 12px', borderRadius: 12, fontSize: 11, fontWeight: 600 }}>Aujourd'hui</span>
                </div>

                {activeConv.messages.map((msg) => {
                  const isUser = msg.sender === user.role || (msg.sender === 'manager' && user.role === 'manager') || (msg.sender !== 'manager' && user.role !== 'manager')
                  // Simple logic: if sender matches user role classification, it's user.
                  const isUserMsg = (user.role === 'manager' && msg.sender === 'manager') || (user.role !== 'manager' && msg.sender !== 'manager')
                  
                  return (
                    <div key={msg.id} style={{ display: 'flex', gap: 12, alignSelf: isUserMsg ? 'flex-end' : 'flex-start', flexDirection: isUserMsg ? 'row-reverse' : 'row', maxWidth: '75%' }}>
                      {!isUserMsg && (
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: activeConv.otherUser.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0, marginTop: 'auto' }}>
                          {activeConv.otherUser.avatar}
                        </div>
                      )}
                      
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: isUserMsg ? 'flex-end' : 'flex-start' }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4, padding: '0 4px' }}>
                          {isUserMsg ? 'Vous' : activeConv.otherUser.name}
                        </div>
                        <div style={{ 
                          background: isUserMsg ? 'var(--primary)' : 'var(--card)', 
                          color: isUserMsg ? '#fff' : 'var(--text)', 
                          padding: '12px 16px', 
                          borderRadius: 20, 
                          borderBottomLeftRadius: isUserMsg ? 20 : 4,
                          borderBottomRightRadius: isUserMsg ? 4 : 20,
                          boxShadow: 'var(--shadow-sm)',
                          fontSize: 14,
                          lineHeight: 1.5
                        }}>
                          {msg.text}
                        </div>
                        <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', marginTop: 4, padding: '0 4px' }}>
                          {msg.time}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Chat Input */}
              <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border)', background: 'var(--card)' }}>
                <form onSubmit={handleSend} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg)', padding: '8px 16px', borderRadius: 24, border: '1px solid var(--border)' }}>
                  <button type="button" className="icon-btn" style={{ background: 'transparent', color: 'var(--text-muted)' }}>
                    <Smile size={20} />
                  </button>
                  <input 
                    type="text" 
                    placeholder="Écrire un message..." 
                    style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 15, padding: '8px 0' }}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                  <button type="submit" className="icon-btn" style={{ background: inputText.trim() ? 'var(--primary)' : 'var(--border)', color: inputText.trim() ? '#fff' : 'var(--text-muted)', transition: 'all 0.2s' }}>
                    <Send size={18} style={{ position: 'relative', left: -1 }} />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'var(--text-muted)' }}>
              <MessageSquare size={48} style={{ opacity: 0.2, marginBottom: 16 }} />
              <div style={{ fontSize: 16, fontWeight: 600 }}>Sélectionnez une conversation</div>
            </div>
          )}
        </div>
        
      </div>
    </motion.div>
  )
}
