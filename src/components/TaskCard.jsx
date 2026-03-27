import React from 'react'
import { motion } from 'framer-motion'
import { Clock, ExternalLink, ChevronDown } from 'lucide-react'

function getPriorityClass(priority) {
  if (priority === 'Urgent') return 'priority-urgent'
  if (priority === 'Normal') return 'priority-normal'
  return 'priority-low'
}

function getStatusClass(status) {
  if (status === 'Todo') return 'status-todo'
  if (status === 'En cours') return 'status-inprogress'
  return 'status-done'
}

export default function TaskCard({ task, onStatusChange, onClick }) {
  return (
    <motion.div
      className={`card ${getPriorityClass(task.priority)}`}
      whileHover={{ y: -4, boxShadow: '0 12px 20px -8px rgba(0,0,0,0.1)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      style={{ border: '1px solid var(--border)', transition: 'all 0.3s ease', cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
    >
      <div className="card-body" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
              {task.project} <ExternalLink size={12} />
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', lineHeight: 1.4 }}>{task.task}</h3>
          </div>
          <div className="badge badge-gray" style={{ fontSize: 10, padding: '4px 8px' }}>#{task.id}</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 12, fontWeight: 600 }}>
              <Clock size={14} /> {task.estimated}
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: task.priority === 'Urgent' ? '#ef4444' : task.priority === 'Normal' ? '#f59e0b' : '#10b981' }}>
              {task.priority}
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <select
              className={`status-pill ${getStatusClass(task.status)}`}
              value={task.status}
              onChange={(e) => {
                e.stopPropagation()
                onStatusChange?.(e.target.value)
              }}
              onClick={(e) => e.stopPropagation()}
              style={{ appearance: 'none', paddingRight: '32px' }}
            >
              <option value="Todo">🔘 Todo</option>
              <option value="En cours">⚡ En cours</option>
              <option value="Terminé">✅ Terminé</option>
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.5 }} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

