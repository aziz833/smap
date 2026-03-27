import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Globe, ExternalLink } from 'lucide-react'
import { useProjects } from '../../context/ProjectContext.jsx'

export default function Team() {
  const { teamMembers } = useProjects()

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="page-head" style={{ marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text)' }}>Notre Équipe</h1>
          <p className="text-muted" style={{ marginTop: 8, fontSize: '15px' }}>
            Les experts qui propulsent vos projets SMA.
          </p>
        </div>
      </div>

      <div className="grid grid-3">
        {teamMembers.map((member, idx) => (
          <motion.div
            key={member.id}
            className="card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ height: 80, background: member.color, opacity: 0.2 }} />
            <div className="card-body" style={{ marginTop: -40, textAlign: 'center' }}>
              <div 
                style={{ 
                  width: 80, 
                  height: 80, 
                  borderRadius: '50%', 
                  background: member.color, 
                  color: '#fff', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: 28, 
                  fontWeight: 800, 
                  margin: '0 auto 16px',
                  border: '4px solid #fff',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                {member.avatar}
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800 }}>{member.name}</h3>
              <p className="text-muted" style={{ fontSize: 13, marginBottom: 20 }}>Développeur Fullstack</p>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 20 }}>
                <a href={`mailto:${member.email}`} className="icon-btn" style={{ background: 'var(--bg)', color: 'var(--text-muted)' }}>
                  <Mail size={18} />
                </a>
                <button className="icon-btn" style={{ background: 'var(--border)', color: 'var(--text)', gap: 8 }} onClick={() => window.open('https://github.com', '_blank')}>
            <Globe size={18} />
            <span style={{ fontSize: 13, fontWeight: 700 }}>GitHub</span>
          </button>
              </div>

              <div style={{ height: 1, background: 'var(--border)', margin: '0 -24px 20px' }} />
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: 'var(--primary)', cursor: 'pointer' }}>
                Voir le profil détaillé <ExternalLink size={14} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
