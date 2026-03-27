import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar as CalendarIcon, Clock, CheckSquare, MessageSquare, Paperclip, AlertTriangle, Send } from 'lucide-react'
import toast from 'react-hot-toast'

export default function HelpRequestModal({ open, taskName, onClose }) {
  const [text, setText] = useState('')

  const handleSend = () => {
    if (!text.trim()) return
    toast.success('Message envoyé au Manager ✅')
    setText('')
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <React.Fragment>
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <div className="modal-wrapper">
            <motion.div
              className="modal-card"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              style={{ maxWidth: 400 }}
            >
              <div className="modal-header" style={{ borderBottom: '1px solid var(--border)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <AlertTriangle size={18} color="var(--danger)" />
                  Demander de l'aide
                </h3>
                <button className="icon-btn" onClick={onClose} style={{ marginLeft: 'auto' }}>
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body" style={{ padding: 20 }}>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>
                  Besoin d'aide pour : <strong>{taskName}</strong>
                </div>
                <textarea
                  className="input"
                  style={{ width: '100%', minHeight: 100, resize: 'vertical' }}
                  placeholder="Décrivez votre problème..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <div className="modal-footer" style={{ borderTop: '1px solid var(--border)', padding: '16px 20px', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                <button className="btn btn-ghost" onClick={onClose}>Annuler</button>
                <button className="btn btn-primary" onClick={handleSend} disabled={!text.trim()}>
                  <Send size={16} /> Envoyer
                </button>
              </div>
            </motion.div>
          </div>
        </React.Fragment>
      )}
    </AnimatePresence>
  )
}
