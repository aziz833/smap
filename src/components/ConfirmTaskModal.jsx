import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, X, MessageSquare, Trophy, Star } from 'lucide-react'

export default function ConfirmTaskModal({ open, task, onClose, onConfirm }) {
  const [comment, setComment] = useState('')
  const [done, setDone] = useState(false)

  const close = () => {
    setComment('')
    setDone(false)
    onClose?.()
  }

  const confirm = async () => {
    setDone(true)
    onConfirm?.({ comment })
    // Succès visible pendant 2.5s
    setTimeout(() => close(), 2500)
  }

  // Particules pour l'effet confetti simulé
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 400 - 200,
    y: Math.random() * -300 - 100,
    rotate: Math.random() * 360,
    color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][i % 5]
  }))

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}
        >
          <motion.div
            className="modal"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            style={{ width: '100%', maxWidth: 480, padding: 0, overflow: 'hidden', borderRadius: 24 }}
          >
            {!done ? (
              <div style={{ padding: 40 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <div style={{ background: 'var(--success-soft)', color: 'var(--success)', padding: 12, borderRadius: 16 }}>
                    <CheckCircle2 size={24} />
                  </div>
                  <button className="icon-btn" onClick={close}><X size={20} /></button>
                </div>

                <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Terminer la tâche ?</h2>
                <p className="text-muted" style={{ fontSize: 14, marginBottom: 24 }}>
                  Confirmez-vous avoir finalisé : <br/>
                  <strong style={{ color: 'var(--text)' }}>"{task?.task}"</strong>
                </p>

                <div className="field" style={{ marginBottom: 32 }}>
                  <label className="label" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <MessageSquare size={14} /> Commentaire (ex: lien PR, roadblocks)
                  </label>
                  <textarea 
                    className="input" 
                    placeholder="Qu'est-ce qui a été fait ?"
                    style={{ minHeight: 100, padding: 14, borderRadius: 16 }}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="btn btn-ghost" style={{ flex: 1 }} onClick={close}>Annuler</button>
                  <button className="btn btn-primary" style={{ flex: 2, background: 'var(--success)' }} onClick={confirm}>Confirmer & Terminer</button>
                </div>
              </div>
            ) : (
              <div style={{ padding: 60, textAlign: 'center', position: 'relative' }}>
                {/* Confetti Animation */}
                {particles.map((p) => (
                  <motion.div
                    key={p.id}
                    initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                    animate={{ x: p.x, y: p.y, opacity: 0, rotate: p.rotate }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      width: 12,
                      height: 12,
                      background: p.color,
                      borderRadius: p.id % 2 === 0 ? '50%' : '2px',
                    }}
                  />
                ))}

                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 12 }}
                >
                  <div style={{ width: 80, height: 80, background: 'var(--success)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 20px 40px -10px rgba(16, 185, 129, 0.4)' }}>
                    <Trophy size={40} />
                  </div>
                  <h2 style={{ fontSize: 26, fontWeight: 900, marginBottom: 12 }}>Félicitations !</h2>
                  <p className="text-muted" style={{ fontSize: 15 }}>
                    Votre progression a été mise à jour. <br/>
                    +15 XP gagnés sur {task?.project}
                  </p>
                  
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ marginTop: 32, display: 'flex', justifyContent: 'center', gap: 8, color: '#F59E0B' }}
                  >
                    <Star size={20} fill="#F59E0B" />
                    <Star size={20} fill="#F59E0B" />
                    <Star size={20} fill="#F59E0B" />
                  </motion.div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

