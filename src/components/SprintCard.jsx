import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Clock3 } from 'lucide-react'
import { daysBetween, formatDateFR, hashToHue, initialsFromName } from '../utils/format.js'

function sprintBadge(status) {
  if (status === 'Active') return 'badge badge-green'
  if (status === 'À venir') return 'badge badge-blue'
  return 'badge badge-gray'
}

function taskPriorityBadge(priority) {
  if (priority === 'Urgent') return 'badge badge-red'
  if (priority === 'Normal') return 'badge badge-blue'
  return 'badge badge-gray'
}

function taskStatusPill(status) {
  if (status === 'Terminé') return 'badge badge-green'
  if (status === 'En cours') return 'badge badge-blue'
  return 'badge badge-gray'
}

export default function SprintCard({ sprint }) {
  const remaining = useMemo(() => {
    const now = new Date()
    const iso = now.toISOString().slice(0, 10)
    return daysBetween(iso, sprint.endDate)
  }, [sprint.endDate])

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
    >
      <div className="card-body" style={{ display: 'grid', gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 16 }}>{sprint.name}</div>
            <div className="text-muted" style={{ marginTop: 4, fontSize: 13 }}>
              {formatDateFR(sprint.startDate)} → {formatDateFR(sprint.endDate)}
            </div>
          </div>
          <div style={{ display: 'grid', gap: 8, justifyItems: 'end' }}>
            <div className={sprintBadge(sprint.status)}>{sprint.status}</div>
            <div className="badge badge-gray" style={{ display: 'inline-flex', gap: 8 }}>
              <Clock3 size={14} />
              {remaining} j restants
            </div>
          </div>
        </div>

        <div className="progress">
          <motion.div
            className="progress-bar"
            initial={{ width: 0 }}
            animate={{ width: `${sprint.progress}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>

        <div style={{ display: 'grid', gap: 10 }}>
          {sprint.tasks?.map((t) => {
            const hue = hashToHue(t.assignee)
            return (
              <div key={t.id} className="task-row">
                <div style={{ display: 'grid', gap: 6 }}>
                  <div style={{ fontWeight: 900 }}>{t.name}</div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <div className="assignee">
                      <span className="mini-avatar" style={{ background: `hsl(${hue} 90% 75%)`, marginLeft: 0 }}>
                        {initialsFromName(t.assignee)}
                      </span>
                      <span className="text-muted" style={{ fontSize: 12, fontWeight: 800 }}>
                        {t.assignee}
                      </span>
                    </div>
                    <div className={taskPriorityBadge(t.priority)}>{t.priority}</div>
                    <div className={taskStatusPill(t.status)}>{t.status}</div>
                    <div className="text-muted" style={{ fontSize: 12, fontWeight: 800 }}>
                      Estimation: {t.estimatedDays} j
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
