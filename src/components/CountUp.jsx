import React, { useEffect, useState } from 'react'
import { animate } from 'framer-motion'

export default function CountUp({ end, duration = 1.5, suffix = '' }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const controls = animate(0, end, {
      duration,
      onUpdate(value) {
        setCount(Math.floor(value))
      },
      ease: 'easeOut'
    })
    return () => controls.stop()
  }, [end, duration])

  return <span>{count}{suffix}</span>
}
