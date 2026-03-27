import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar as CalendarIcon, Clock, CheckSquare, MessageSquare, Paperclip, Send, CheckCircle2, AlertTriangle } from 'lucide-react'
import HelpRequestModal from './HelpRequestModal.jsx'

export default function TaskDetailPanel({ task, isOpen, onClose }) {
  const [helpOpen, setHelpOpen] = useState(false)
  const [comment, setComment] = useState('')

  if (!task) return null

  // Dummy subtasks and comments for showcase
  const subtasks = [
    { id: 1, text: 'Créer le composant modal', done: true },
    { id: 2, text: 'Ajouter la validation', done: false },
    { id: 3, text: 'Tester sur mobile', done: false }
  ]

  const comments = [
    { id: 1, author: 'Manager', time: 'Hier, 14:30', text: "N'oublie pas les tests unitaires", avatar: 'M' }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          <motion.div
            className="drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ zIndex: 200 }}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{ 
              position: 'fixed', 
              top: 0, 
              right: 0, 
              bottom: 0, 
              width: 450, 
              background: 'var(--card)',
              zIndex: 210,
              boxShadow: '-4px 0 24px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Header */}
            <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span className={`badge badge-${task.priority === 'Haute' ? 'red' : task.priority === 'Moyenne' ? 'orange' : 'blue'}`}>
                    {task.priority || 'Normal'}
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>Projet: Core App • Sprint 2</span>
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', lineHeight: 1.3, margin: 0 }}>
                  {task.title}
                </h2>
              </div>
              <button className="icon-btn" onClick={onClose} style={{ background: 'var(--bg)', flexShrink: 0 }}>
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: 32 }}>
              
              {/* Properties */}
              <div style={{ display: 'flex', gap: 24, padding: '16px', background: 'var(--bg)', borderRadius: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={14}/> Temps estimé</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>4h 30m</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}><CalendarIcon size={14}/> Date de début</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Aujourd'hui</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: 'var(--text)' }}>Description</h3>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Implémenter la logique de confirmation pour les actions destructrices dans l'ensemble de l'application, en s'assurant que l'UX soit fluide.
                </p>
              </div>

              {/* Subtasks */}
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CheckSquare size={16} color="var(--primary)" />
                  Sous-tâches (1/3)
                </h3>
                <div style={{ display: 'grid', gap: 8 }}>
                  {subtasks.map(st => (
                    <div key={st.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: 'var(--bg)', borderRadius: 8 }}>
                      <input type="checkbox" defaultChecked={st.done} style={{ width: 16, height: 16, accentColor: 'var(--primary)', cursor: 'pointer' }} />
                      <span style={{ fontSize: 14, fontWeight: 500, color: st.done ? 'var(--text-muted)' : 'var(--text)', textDecoration: st.done ? 'line-through' : 'none' }}>
                        {st.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attachments */}
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Paperclip size={16} color="var(--primary)" />
                  Pièces jointes
                </h3>
                <div style={{ border: '1px dashed var(--border)', borderRadius: 8, padding: 20, textAlign: 'center' }}>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>Aucune pièce jointe</div>
                  <button className="btn btn-ghost" disabled style={{ fontSize: 13 }}>+ Ajouter</button>
                </div>
              </div>

              {/* Comments */}
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <MessageSquare size={16} color="var(--primary)" />
                  Commentaires
                </h3>
                <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
                  {comments.map(c => (
                    <div key={c.id} style={{ display: 'flex', gap: 12 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--primary-soft)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>
                        {c.avatar}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: 13, fontWeight: 700 }}>{c.author}</span>
                          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.time}</span>
                        </div>
                        <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                          {c.text}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>
                    AB
                  </div>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <input 
                      type="text" 
                      className="input" 
                      placeholder="Ajouter un commentaire..." 
                      style={{ width: '100%', paddingRight: 40 }}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button className="icon-btn" style={{ position: 'absolute', right: 4, top: 4, background: 'transparent', color: comment.trim() ? 'var(--primary)' : 'var(--border)' }}>
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border)', display: 'flex', gap: 12, background: 'var(--bg)' }}>
              <button 
                className="btn btn-primary" 
                style={{ flex: 1, background: 'var(--success)', borderColor: 'var(--success)', color: '#fff' }}
                onClick={() => {
                  toast.success('Fantastique! Tâche terminée.')
                  onClose()
                }}
              >
                <CheckCircle2 size={16} /> Marquer comme terminé
              </button>
              <button 
                className="btn btn-ghost" 
                style={{ color: 'var(--danger)', background: 'var(--danger-soft)' }}
                onClick={() => setHelpOpen(true)}
              >
                🆘 Demander de l'aide
              </button>
            </div>
          </motion.div>
          
          <HelpRequestModal open={helpOpen} taskName={task.title} onClose={() => setHelpOpen(false)} />
        </React.Fragment>
      )}
    </AnimatePresence>
  )
}
