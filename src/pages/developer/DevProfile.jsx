import React from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext.jsx'
import { Mail, Edit3, Key, CheckCircle2, Clock, Zap, Target } from 'lucide-react'
import StatCard from '../../components/StatCard.jsx'

export default function DevProfile() {
  const { user } = useAuth()

  // Use the initials logic from existing functions, or simple inline:
  const getInitials = (name) => {
    const parts = String(name || '').trim().split(' ').filter(Boolean)
    const a = parts[0]?.[0] ?? '?'
    const b = parts[1]?.[0] ?? ''
    return (a + b).toUpperCase()
  }

  const hue = 210 // A consistent blue hue for the user avatar here, or could be dynamic
  const avatarColor = `hsl(${hue} 80% 80%)`
  const avatarText = `hsl(${hue} 80% 25%)`

  const skills = ['React', 'FastAPI', 'Python', 'Docker', 'PostgreSQL', 'Tailwind CSS']

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
          <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text)' }}>Profil</h1>
          <p className="text-muted" style={{ marginTop: 8, fontSize: '15px' }}>
            Gérez vos informations et consultez vos statistiques.
          </p>
        </div>
      </div>

      <div className="grid grid-3" style={{ marginBottom: 32 }}>
        <StatCard title="Tâches terminées" value={12} icon={<CheckCircle2 size={20} />} color="green" subtitle="Ce mois-ci" />
        <StatCard title="Sprints complétés" value={3} icon={<Zap size={20} />} color="purple" subtitle="Dans les temps" />
        <StatCard title="Heures loggées" value="48h" icon={<Clock size={20} />} color="blue" subtitle="Temps total" />
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: 24, alignItems: 'start' }}>
        
        {/* Main Details */}
        <div style={{ display: 'grid', gap: 24 }}>
          <div className="card">
            <div className="card-header" style={{ fontSize: '18px', fontWeight: 700 }}>Informations Générales</div>
            <div className="card-body" style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
              <div 
                style={{ 
                  width: 96, 
                  height: 96, 
                  borderRadius: '50%', 
                  background: avatarColor, 
                  color: avatarText, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: 32, 
                  fontWeight: 800,
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                {getInitials(user?.name)}
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 24, fontWeight: 800 }}>{user?.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                  <span className="badge badge-blue">{user?.role}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 13, fontWeight: 500 }}>
                    <Mail size={14} /> {user?.email}
                  </span>
                </div>
              </div>
            </div>
            <div className="card-footer" style={{ borderTop: '1px solid var(--border)', padding: '16px 20px', display: 'flex', gap: 12 }}>
              <button className="btn btn-primary" style={{ flex: 1 }}>
                <Edit3 size={16} /> Éditer le profil
              </button>
              <button className="btn btn-ghost" style={{ flex: 1 }}>
                <Key size={16} /> Changer le mot de passe
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-header" style={{ fontSize: '18px', fontWeight: 700 }}>Compétences Techniques</div>
            <div className="card-body">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {skills.map(skill => (
                  <div 
                    key={skill} 
                    style={{ 
                      padding: '6px 12px', 
                      background: 'var(--bg)', 
                      border: '1px solid var(--border)', 
                      borderRadius: 8, 
                      fontSize: 13, 
                      fontWeight: 600,
                      color: 'var(--text-muted)'
                    }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane */}
        <div style={{ display: 'grid', gap: 24 }}>
          <div className="card">
            <div className="card-header" style={{ fontSize: '18px', fontWeight: 700 }}>Activité Actuelle</div>
            <div className="card-body" style={{ display: 'grid', gap: 16 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>Projet en cours</div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>Refonte API Globale</div>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>Sprint Actif</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Sprint 2</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--success)' }}>85%</div>
                </div>
                <div className="progress" style={{ height: 6, marginTop: 8 }}>
                  <div className="progress-bar" style={{ width: '85%', background: 'var(--success)' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  )
}
