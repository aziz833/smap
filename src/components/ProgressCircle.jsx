import React from 'react'
import { motion } from 'framer-motion'

export default function ProgressCircle({ value, size = 120 }) {
  const r = 46
  const c = 2 * Math.PI * r
  const offset = c * (1 - value / 100)

  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <svg viewBox="0 0 120 120" width={size} height={size}>
        <circle cx="60" cy="60" r={r} stroke="rgba(148,163,184,0.28)" strokeWidth="10" fill="none" />
        <motion.circle
          cx="60"
          cy="60"
          r={r}
          stroke="#2563eb"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          style={{ transformOrigin: '60px 60px', transform: 'rotate(-90deg)' }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
          fontWeight: 900,
          fontSize: 22,
        }}
      >
        {value}%
      </div>
    </div>
  )
}
