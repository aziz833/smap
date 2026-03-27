import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'react-router-dom'
import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Users,
  ShieldAlert,
  ChevronLeft
} from 'lucide-react'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Pie, PieChart, Cell, Bar, BarChart } from 'recharts'
import { useProjects } from '../../context/ProjectContext.jsx'
import { formatDateFR, hashToHue, initialsFromName } from '../../utils/format.js'
import SprintCard from '../../components/SprintCard.jsx'
import RiskCard from '../../components/RiskCard.jsx'
import { useNavigate } from 'react-router-dom'

const tabs = [
  { key: 'general', label: 'Vue d\'ensemble', icon: <ClipboardList size={16} /> },
  { key: 'sprints', label: 'Sprints', icon: <CalendarDays size={16} /> },
  { key: 'team', label: 'Équipe', icon: <Users size={16} /> },
  { key: 'risks', label: 'Risques', icon: <ShieldAlert size={16} /> },
  { key: 'reports', label: 'Analyses', icon: <BarChart3 size={16} /> },
]

function StatusBadge({ status }) {
  const className = useMemo(() => {
    if (status === 'Nouveau') return 'badge-blue'
    if (status === 'En cours') return 'badge-green'
    return 'badge-gray'
  }, [status])
  
  return <span className={`badge ${className}`}>{status}</span>
}

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tab, setTab] = useState('general')

  const { projects } = useProjects()
  const project = useMemo(() => projects.find((p) => p.id === id) || projects[0], [id, projects])

  const reportTasksPerSprint = useMemo(() => {
    return (project.sprints || []).map((s) => ({ name: s.name, tasks: s.tasks?.length || 0 }))
  }, [project.sprints])

  const reportTaskStatus = useMemo(() => {
    const map = { Todo: 0, 'En cours': 0, Terminé: 0 }
    for (const s of project.sprints || []) {
      for (const t of s.tasks || []) {
        map[t.status] = (map[t.status] || 0) + 1
      }
    }
    return [
      { name: 'A faire', value: map.Todo || 0 },
      { name: 'En cours', value: map['En cours'] || 0 },
      { name: 'Terminé', value: map.Terminé || 0 },
    ]
  }, [project.sprints])

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div style={{ marginBottom: 24 }}>
        <button onClick={() => navigate(-1)} className="btn btn-ghost" style={{ padding: '4px 8px', fontSize: '13px', marginBottom: '16px', border: 'none' }}>
          <ChevronLeft size={16} /> Retour
        </button>
        
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <StatusBadge status={project.status} />
              <span className="text-muted" style={{ fontSize: '13px', fontWeight: 600 }}>ID: {project.id}</span>
            </div>
            <h1 style={{ fontSize: 36, fontWeight: 800, color: 'var(--text)' }}>{project.name}</h1>
            <p className="text-muted" style={{ marginTop: 12, fontSize: '15px', maxWidth: '800px', lineHeight: 1.6 }}>
              {project.description}
            </p>
          </div>
          
          <div className="card" style={{ padding: '16px', minWidth: '200px' }}>
            <div className="text-muted" style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>Progression</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary)', marginBottom: '8px' }}>{project.progress}%</div>
            <div className="progress" style={{ height: '6px' }}>
              <motion.div
                className="progress-bar"
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderBottom: '1px solid var(--border-light)', marginBottom: 24, display: 'flex', gap: 8, overflowX: 'auto' }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              padding: '12px 20px',
              background: 'none',
              border: 'none',
              borderBottom: tab === t.key ? '2px solid var(--primary)' : '2px solid transparent',
              color: tab === t.key ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {tab === 'general' && (
            <div className="grid" style={{ gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }}>
              <div className="card">
                <div className="card-header">Détails du projet</div>
                <div className="card-body" style={{ display: 'grid', gap: 24 }}>
                  <div className="grid grid-3">
                    <div className="field">
                      <span className="label">Date de début</span>
                      <div style={{ fontWeight: 600 }}>{formatDateFR(project.startDate)}</div>
                    </div>
                    <div className="field">
                      <span className="label">Date de fin prévue</span>
                      <div style={{ fontWeight: 600 }}>{formatDateFR(project.deadline)}</div>
                    </div>
                    <div className="field">
                      <span className="label">Budget</span>
                      <div style={{ fontWeight: 600 }}>{project.budget?.toLocaleString()} DT</div>
                    </div>
                  </div>

                  <div>
                    <div className="label" style={{ marginBottom: 12 }}>Technologies utilisées</div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {project.technologies?.map(tech => (
                        <span key={tech} className="badge badge-gray">{tech}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="label" style={{ marginBottom: 12 }}>Objectifs & Exigences</div>
                    <div style={{ display: 'grid', gap: 12 }}>
                      {project.requirements?.map((req, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px', background: 'var(--bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                          {req.done ? <CheckCircle2 size={18} color="var(--success)" /> : <div style={{ width: 18, height: 18, border: '2px solid var(--border)', borderRadius: '4px' }} />}
                          <span style={{ fontSize: '14px', fontWeight: req.done ? 500 : 400, color: req.done ? 'var(--text)' : 'var(--text-muted)' }}>{req.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid" style={{ gap: 24 }}>
                <div className="card">
                  <div className="card-header">Résumé de l'équipe</div>
                  <div className="card-body">
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {project.team?.map((m, i) => {
                        const hue = hashToHue(m.email)
                        return (
                          <div key={i} title={m.name} style={{ width: 36, height: 36, borderRadius: '50%', background: `hsl(${hue} 80% 80%)`, color: `hsl(${hue} 80% 25%)`, display: 'flex', alignItems: 'center', justifyCenter: 'center', fontWeight: 700, fontSize: '13px', border: '2px solid #fff' }}>
                            <div style={{ margin: 'auto' }}>{initialsFromName(m.name)}</div>
                          </div>
                        )
                      })}
                    </div>
                    <div className="text-muted" style={{ marginTop: 16, fontSize: '13px' }}>
                      <b>{project.team?.length || 0} membres</b> travaillent sur ce projet.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'sprints' && (
            <div className="grid" style={{ gap: 20 }}>
              {project.sprints?.map(s => (
                <SprintCard key={s.id} sprint={s} />
              ))}
            </div>
          )}

          {tab === 'team' && (
            <div className="grid grid-3">
              {project.team?.map(m => {
                const hue = hashToHue(m.email)
                return (
                  <div key={m.email} className="card">
                    <div className="card-body" style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                      <div className="avatar" style={{ background: `hsl(${hue} 80% 80%)`, color: `hsl(${hue} 80% 25%)` }}>
                        {initialsFromName(m.name)}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 700 }}>{m.name}</div>
                        <div className="text-muted" style={{ fontSize: '13px' }}>{m.email}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {tab === 'risks' && (
            <div className="grid grid-3">
              {project.risks?.map(r => (
                <RiskCard key={r.id} risk={r} />
              ))}
            </div>
          )}

          {tab === 'reports' && (
            <div className="grid grid-3">
              <div className="card">
                <div className="card-header">Tâches par Sprint</div>
                <div className="card-body" style={{ height: 260 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={reportTasksPerSprint}>
                      <XAxis dataKey="name" fontSize={12} />
                      <YAxis allowDecimals={false} fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="tasks" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="card">
                <div className="card-header">Statut Global</div>
                <div className="card-body" style={{ height: 260 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={reportTaskStatus} dataKey="value" nameKey="name" innerRadius={60} outerRadius={80} paddingAngle={5}>
                        <Cell fill="#94a3b8" />
                        <Cell fill="var(--secondary)" />
                        <Cell fill="var(--success)" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="card">
                <div className="card-header">Courbe de Progression</div>
                <div className="card-body" style={{ height: 260 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={project.progressHistory}>
                      <XAxis hide />
                      <YAxis domain={[0, 100]} fontSize={12} />
                      <Tooltip />
                      <Line type="monotone" dataKey="progress" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4, fill: 'var(--primary)' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
