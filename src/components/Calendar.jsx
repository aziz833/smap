import React, { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, X, Clock, Users, ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

function startOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

function endOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0)
}

function addMonths(d, delta) {
  return new Date(d.getFullYear(), d.getMonth() + delta, 1)
}

function sameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function toISODate(d) {
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

function inRange(dayIso, startIso, endIso) {
  return dayIso >= startIso && dayIso <= endIso
}

const PROJECT_COLORS = {
  'Plateforme e-Gestion': '#3b82f6',
  'Refonte API & Sécurité': '#10b981',
  'Portail Client UI': '#f59e0b',
}

export default function Calendar({ projects, onOpenProject, fullPage = false }) {
  const [cursor, setCursor] = useState(() => new Date())
  const [selectedProject, setSelectedProject] = useState(null)

  const today = useMemo(() => new Date(), [])

  const days = useMemo(() => {
    const s = startOfMonth(cursor)
    const e = endOfMonth(cursor)

    const firstWeekday = (s.getDay() + 6) % 7
    const totalDays = e.getDate()

    const slots = []
    for (let i = 0; i < firstWeekday; i += 1) slots.push(null)
    for (let d = 1; d <= totalDays; d += 1) slots.push(new Date(cursor.getFullYear(), cursor.getMonth(), d))

    const trailing = (7 - (slots.length % 7)) % 7
    for (let i = 0; i < trailing; i += 1) slots.push(null)

    return slots
  }, [cursor])

  const monthLabel = useMemo(() => {
    return cursor.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
  }, [cursor])

  const projectForDay = useMemo(() => {
    const map = new Map()
    for (const p of projects || []) {
      const s = p.startDate
      const e = p.deadline
      if (!s || !e) continue
      for (const slot of days) {
        if (!slot) continue
        const iso = toISODate(slot)
        if (inRange(iso, s, e)) {
          if (!map.has(iso)) map.set(iso, [])
          map.get(iso).push(p)
        }
      }
    }
    return map
  }, [days, projects])

  return (
    <div className={fullPage ? 'calendar-full' : 'calendar-mini'}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h2 style={{ fontSize: fullPage ? '20px' : '16px', fontWeight: 800, textTransform: 'capitalize', color: 'var(--text)' }}>
            {monthLabel}
          </h2>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="icon-btn" onClick={() => setCursor((d) => addMonths(d, -1))} style={{ width: 32, height: 32 }}>
            <ChevronLeft size={18} />
          </button>
          <button className="icon-btn" onClick={() => setCursor((d) => addMonths(d, 1))} style={{ width: 32, height: 32 }}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((d) => (
          <div key={d} className="calendar-day-header">{d}</div>
        ))}
        {days.map((d, idx) => {
          if (!d) return <div key={`e-${idx}`} className="calendar-day-cell empty" />
          
          const iso = toISODate(d)
          const items = projectForDay.get(iso) || []
          const isToday = sameDay(d, today)
          const isWeekend = d.getDay() === 0 || d.getDay() === 6

          return (
            <div 
              key={iso} 
              className={`calendar-day-cell ${isToday ? 'today' : ''} ${isWeekend ? 'weekend' : ''}`}
              style={{
                background: isToday ? 'var(--primary-soft)' : isWeekend ? '#f8fafc' : '#fff',
                borderColor: isToday ? 'var(--primary)' : 'var(--border-light)',
                minHeight: fullPage ? 120 : 80
              }}
            >
              <div className="day-number" style={{ fontWeight: isToday ? 800 : 500 }}>{d.getDate()}</div>
              
              <div className="day-events">
                {items.slice(0, fullPage ? 3 : 1).map((p) => (
                  <motion.div
                    key={p.id}
                    className="event-bar"
                    style={{ background: PROJECT_COLORS[p.name] || 'var(--primary)' }}
                    onClick={() => fullPage ? setSelectedProject(p) : onOpenProject?.(p)}
                    whileHover={{ scale: 1.02, filter: 'brightness(1.1)' }}
                  >
                    <div className="event-dot" />
                    <span className="event-name">{p.name}</span>
                  </motion.div>
                ))}
                {items.length > (fullPage ? 3 : 1) && (
                  <div className="event-more">+{items.length - (fullPage ? 3 : 1)} de plus</div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            style={{ zIndex: 1000 }}
          >
            <motion.div 
              className="modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: 400, padding: 0, overflow: 'hidden' }}
            >
              <div style={{ height: 6, background: PROJECT_COLORS[selectedProject.name] || 'var(--primary)' }} />
              <div style={{ padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 800 }}>{selectedProject.name}</h3>
                    <div className={`badge badge-${selectedProject.status === 'En cours' ? 'green' : 'blue'}`} style={{ marginTop: 8 }}>
                      {selectedProject.status}
                    </div>
                  </div>
                  <button className="icon-btn" onClick={() => setSelectedProject(null)}>
                    <X size={18} />
                  </button>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                    <span className="text-muted">Progression</span>
                    <span style={{ fontWeight: 700 }}>{selectedProject.progress}%</span>
                  </div>
                  <div className="progress" style={{ height: 6 }}>
                    <div 
                      className="progress-bar" 
                      style={{ 
                        width: `${selectedProject.progress}%`, 
                        background: PROJECT_COLORS[selectedProject.name] || 'var(--primary)' 
                      }} 
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                    <Clock size={16} className="text-muted" />
                    <span>{new Date(selectedProject.startDate).toLocaleDateString()} → {new Date(selectedProject.deadline).toLocaleDateString()}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                    <Users size={16} className="text-muted" />
                    <span>{selectedProject.team?.length || 0} membres d'équipe</span>
                  </div>
                </div>

                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', marginTop: 24 }}
                  onClick={() => onOpenProject?.(selectedProject)}
                >
                  Voir Détails <ArrowUpRight size={16} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 1px;
          background: var(--border-light);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .calendar-day-header {
          background: #fff;
          padding: 12px;
          text-align: center;
          font-size: 13px;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .calendar-day-cell {
          background: #fff;
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }
        .calendar-day-cell.empty {
          background: #f8fafc;
        }
        .day-number {
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 4px;
        }
        .event-bar {
          height: 24px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0 8px;
          color: white;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          overflow: hidden;
        }
        .event-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: white;
          flex-shrink: 0;
        }
        .event-name {
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .event-more {
          font-size: 10px;
          font-weight: 700;
          color: var(--primary);
          padding-left: 4px;
        }
      `}} />
    </div>
  )
}

