import React, { useState, useRef, useEffect } from 'react'
import { Bell, Check, MessageSquare, ClipboardList, AlertTriangle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const initialNotifications = [
  { id: 1, type: 'task', text: '📋 Nouvelle tâche assignée: Implémenter...', read: false, time: 'Il y a 10 min' },
  { id: 2, type: 'message', text: '💬 Message de Manager: Bonjour Aziz...', read: false, time: 'Il y a 1h' },
  { id: 3, type: 'warning', text: '⚠️ Sprint 2 commence dans 2 jours', read: false, time: 'Il y a 3h' },
  { id: 4, type: 'success', text: '✅ Tâche validée par Manager', read: true, time: 'Hier' },
]

export default function TopNavbar() {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState(initialNotifications)
  const dropdownRef = useRef(null)

  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }

  return (
    <div className="top-navbar" style={{ 
      height: 64, 
      borderBottom: '1px solid var(--border)', 
      background: 'var(--card)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'flex-end', 
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }}>
      <div style={{ position: 'relative' }} ref={dropdownRef}>
        <button 
          className="icon-btn" 
          onClick={() => setOpen(!open)}
          style={{ position: 'relative', background: open ? 'var(--primary-soft)' : 'transparent', color: open ? 'var(--primary)' : 'var(--text-muted)' }}
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                position: 'absolute',
                top: 2,
                right: 2,
                width: 18,
                height: 18,
                background: 'var(--danger)',
                color: '#fff',
                borderRadius: '50%',
                fontSize: 10,
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid var(--card)'
              }}
            >
              {unreadCount}
            </motion.div>
          )}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: 320,
                background: 'var(--card)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-xl)',
                border: '1px solid var(--border)',
                overflow: 'hidden',
                zIndex: 50
              }}
            >
              <div style={{ padding: '16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: 800, fontSize: 16 }}>Notifications</div>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                  >
                    Tout marquer lu
                  </button>
                )}
              </div>
              <div style={{ maxHeight: 360, overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>
                    Aucune notification
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div 
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      style={{ 
                        padding: '16px', 
                        borderBottom: '1px solid var(--border)', 
                        background: n.read ? 'var(--card)' : 'var(--primary-soft)',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        display: 'flex',
                        gap: 12
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: n.read ? 500 : 700, color: 'var(--text)', lineHeight: 1.4, marginBottom: 4 }}>
                          {n.text}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>
                          {n.time}
                        </div>
                      </div>
                      {!n.read && (
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)', flexShrink: 0, marginTop: 4 }} />
                      )}
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
