import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Calendar from '../../components/Calendar.jsx'
import { projects } from '../../data/mockData.js'
import { useNavigate } from 'react-router-dom'

export default function CalendarPage() {
  const navigate = useNavigate()
  
  const openProject = (p) => {
    navigate(`/projects/${p.id}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="page-head">
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text)' }}>Planning & Calendrier</h1>
          <p className="text-muted" style={{ marginTop: 8 }}>
            Consultez le planning global de tous les projets IT.
          </p>
        </div>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <Calendar projects={projects} onOpenProject={openProject} fullPage />
      </div>

      <div style={{ marginTop: 32 }} className="card">
        <div className="card-header" style={{ fontWeight: 700 }}>Légende des Projets</div>
        <div className="card-body" style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#3b82f6' }} />
            <span style={{ fontSize: 14, fontWeight: 500 }}>Plateforme e-Gestion</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }} />
            <span style={{ fontSize: 14, fontWeight: 500 }}>Refonte API & Sécurité</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
            <span style={{ fontSize: 14, fontWeight: 500 }}>Portail Client UI</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
