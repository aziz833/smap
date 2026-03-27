import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { CalendarDays } from 'lucide-react'
import { formatDateFR, hashToHue, initialsFromName } from '../utils/format.js'

function statusBadge(status) {
  if (status === 'Nouveau') return 'badge badge-blue'
  if (status === 'En cours') return 'badge badge-green'
  return 'badge badge-gray'
}

export default function ProjectCard({ project, onClick }) {
  const avatars = useMemo(() => project.team?.slice(0, 4) || [], [project.team])

  return (
    <motion.button
      type="button"
      className="card project-card"
      onClick={onClick}
      whileHover={{ y: -4, boxShadow: 'var(--shadow-md)', borderColor: 'var(--primary)' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{ width: '100%', border: '1px solid var(--border)', background: 'var(--card)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', borderRadius: 'var(--radius-lg)' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, width: '100%' }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 800, fontSize: '18px', color: 'var(--text)', lineHeight: 1.2 }}>{project.name}</div>
          <div className={statusBadge(project.status)} style={{ marginTop: 8 }}>
            {project.status}
          </div>
        </div>
        <div className="progress-pill" style={{ background: 'var(--primary-soft)', border: '1px solid var(--primary)', color: 'var(--primary)', fontWeight: 800, fontSize: '12px', padding: '4px 8px', borderRadius: 'var(--radius-full)' }}>
          {project.progress}%
        </div>
      </div>

      <div className="text-muted" style={{ fontSize: '14px', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {project.description}
      </div>

      <div style={{ marginTop: 'auto', display: 'grid', gap: '12px' }}>
        <div className="progress" style={{ height: '6px' }}>
          <motion.div
            className="progress-bar"
            initial={{ width: 0 }}
            animate={{ width: `${project.progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ background: 'var(--primary)' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="avatar-row" style={{ display: 'flex', alignItems: 'center' }}>
            {avatars.map((m, i) => {
              const hue = hashToHue(m.email)
              return (
                <div
                  key={m.email}
                  className="mini-avatar"
                  title={m.name}
                  style={{ 
                    width: '28px', 
                    height: '28px', 
                    borderRadius: '50%', 
                    background: `hsl(${hue} 80% 80%)`, 
                    color: `hsl(${hue} 80% 25%)`, 
                    fontSize: '11px', 
                    fontWeight: 800, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    border: '2px solid #fff', 
                    marginLeft: i === 0 ? 0 : '-8px',
                    zIndex: 10 - i 
                  }}
                >
                  {initialsFromName(m.name)}
                </div>
              )
            })}
          </div>
          <div className="date-range" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
            <CalendarDays size={14} />
            <span>{formatDateFR(project.deadline)}</span>
          </div>
        </div>
      </div>
    </motion.button>
  )
}
