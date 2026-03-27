import React from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, CheckCircle2 } from 'lucide-react'
import ProgressCircle from '../../components/ProgressCircle.jsx'
import { clientProject } from '../../data/mockData.js'
import { formatDateFR } from '../../utils/format.js'

function statusBadge(status) {
  if (status === 'En cours') return 'badge badge-green'
  if (status === 'Nouveau') return 'badge badge-blue'
  return 'badge badge-gray'
}

export default function ClientDashboard() {
  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25 }}
    >
      <h1 style={{ fontSize: 28, fontWeight: 900 }}>Mon Projet</h1>
      <p className="text-muted" style={{ marginTop: 6 }}>
        Suivi simple et transparent de la progression.
      </p>

      <div style={{ height: 16 }} />

      <div className="grid" style={{ gridTemplateColumns: '1.2fr 0.8fr', gap: 16 }}>
        <div className="card hero">
          <div className="card-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
            <div style={{ minWidth: 240 }}>
              <div className={statusBadge(clientProject.status)} style={{ width: 'fit-content' }}>
                {clientProject.status}
              </div>
              <div style={{ fontSize: 20, fontWeight: 900, marginTop: 10 }}>
                {clientProject.name}
              </div>
              <div className="text-muted" style={{ marginTop: 8, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', fontSize: 13, fontWeight: 700 }}>
                <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                  <CalendarDays size={16} /> {formatDateFR(clientProject.startDate)}
                </span>
                <span>→</span>
                <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                  <CalendarDays size={16} /> {formatDateFR(clientProject.deadline)}
                </span>
              </div>
            </div>
            <ProgressCircle value={clientProject.progress} />
          </div>
        </div>

        <div className="card">
          <div className="card-header" style={{ fontWeight: 900 }}>Stats</div>
          <div className="card-body" style={{ display: 'grid', gap: 12 }}>
            <div className="stat-mini">
              <div className="text-muted">Tâches Terminées</div>
              <div className="stat-value">{clientProject.stats.done}</div>
            </div>
            <div className="stat-mini">
              <div className="text-muted">En Cours</div>
              <div className="stat-value">{clientProject.stats.inProgress}</div>
            </div>
            <div className="stat-mini">
              <div className="text-muted">Restantes</div>
              <div className="stat-value">{clientProject.stats.remaining}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: 16 }} />

      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="card">
          <div className="card-header" style={{ fontWeight: 900 }}>Jalons</div>
          <div className="card-body">
            <div className="timeline">
              {clientProject.milestones.map((m) => (
                <div key={m.label} className="timeline-item">
                  <div className={`timeline-dot ${m.state}`}>
                    {m.state === 'done' ? <CheckCircle2 size={14} /> : null}
                  </div>
                  <div style={{ fontWeight: 900 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header" style={{ fontWeight: 900 }}>Dernières mises à jour</div>
          <div className="card-body" style={{ display: 'grid', gap: 10 }}>
            {clientProject.updates.map((u) => (
              <div key={u.label} className="feed-item">
                <div style={{ fontWeight: 900 }}>{u.label}</div>
                <div className="text-muted" style={{ fontSize: 12, marginTop: 4 }}>
                  {formatDateFR(u.date)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
