import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

function useCountUp(target, durationMs = 1200) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let raf = 0
    const start = performance.now()

    const tick = (now) => {
      const t = Math.min(1, (now - start) / durationMs)
      // Cubic ease out
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(eased * target))
      if (t < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, durationMs])

  return value
}

export default function StatCard({ title, value, icon, color = 'blue', subtitle }) {
  const iconBg = useMemo(() => {
    if (color === 'purple') return 'var(--primary-soft)'
    if (color === 'red') return 'var(--danger-soft)'
    if (color === 'green') return 'var(--success-soft)'
    return 'var(--secondary-soft)'
  }, [color])

  const iconColor = useMemo(() => {
    if (color === 'purple') return 'var(--primary)'
    if (color === 'red') return 'var(--danger)'
    if (color === 'green') return 'var(--success)'
    return 'var(--secondary)'
  }, [color])

  const count = value

  return (
    <motion.div
      className="card"
      whileHover={{ y: -2, boxShadow: 'var(--shadow-md)' }}
      transition={{ duration: 0.2 }}
    >
      <div className="card-body" style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 'var(--radius-md)',
            background: iconBg,
            display: 'grid',
            placeItems: 'center',
            color: iconColor,
          }}
        >
          {React.cloneElement(icon, { size: 22 })}
        </div>
        <div style={{ minWidth: 0 }}>
          <div className="text-muted" style={{ fontWeight: 600, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
            {title}
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, marginTop: 4, color: 'var(--text)', lineHeight: 1 }}>
            {count}
          </div>
          {subtitle && (
            <div className="text-muted" style={{ fontSize: '12px', marginTop: 6, fontWeight: 500 }}>
              {subtitle}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
