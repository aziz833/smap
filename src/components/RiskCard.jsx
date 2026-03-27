import React from 'react'
import { motion } from 'framer-motion'

function levelColor(level) {
  if (level === 'Élevé') return 'var(--danger)'
  if (level === 'Moyen') return 'var(--warning)'
  return 'var(--success)'
}

function probBadge(p) {
  if (p === 'Haute') return 'badge badge-red'
  if (p === 'Moyenne') return 'badge badge-blue'
  return 'badge badge-gray'
}

export default function RiskCard({ risk }) {
  const c = levelColor(risk.level)

  return (
    <motion.div
      className="card risk"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      style={{ borderLeft: `6px solid ${c}` }}
    >
      <div className="card-body" style={{ display: 'grid', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
          <div style={{ fontWeight: 900 }}>Risque ({risk.level})</div>
          <div className={probBadge(risk.probability)}>{risk.probability}</div>
        </div>

        <div className="text-muted" style={{ fontSize: 13, lineHeight: 1.6 }}>
          {risk.description}
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="badge badge-gray">Impact: {risk.impact}</div>
        </div>

        <div className="solution">
          <div style={{ fontWeight: 900, marginBottom: 6 }}>Solution</div>
          <div className="text-muted" style={{ fontSize: 13, lineHeight: 1.6 }}>
            {risk.solution}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
