import React from 'react'
import { motion } from 'framer-motion'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ReferenceDot,
  LabelList
} from 'recharts'
import { ChevronDown, CheckCircle2, Clock, AlertTriangle, Zap } from 'lucide-react'
import StatCard from '../../components/StatCard.jsx'

export default function Reports() {
  
  // Data for Chart 1: Bar Chart (Tâches par Sprint)
  const barData = [
    { name: 'Sprint 1', tasks: 4, fill: '#10b981' }, // green
    { name: 'Sprint 2', tasks: 3, fill: '#3b82f6' }, // blue
    { name: 'Sprint 3', tasks: 0, fill: '#94a3b8' }  // gray
  ]

  // Data for Chart 2: Donut Chart (Statut)
  const pieData = [
    { name: 'Terminées', value: 8, color: '#10b981', percentage: '53%' },
    { name: 'En cours', value: 4, color: '#3b82f6', percentage: '27%' },
    { name: 'À faire', value: 3, color: '#94a3b8', percentage: '20%' }
  ]

  // Data for Chart 3: Area Chart (Progression)
  const areaData = [
    { month: 'Jan', progress: 10 },
    { month: 'Fév', progress: 30 },
    { month: 'Mar', progress: 45 },
    { month: 'Avr', progress: 68 },
    { month: 'Mai', progress: 68 },
    { month: 'Jun', progress: 68 }
  ]

  // Team Performance Mock Data
  const teamPerformance = [
    { name: 'Aziz Benrejeb', avatar: 'AB', color: '#3B82F6', assigned: 5, completed: 4, rate: 80, badge: 'green', status: '✅ Dans les temps' },
    { name: 'Mohamed Amine', avatar: 'MA', color: '#10B981', assigned: 4, completed: 3, rate: 75, badge: 'green', status: '✅ Dans les temps' },
    { name: 'Yosr', avatar: 'YO', color: '#F59E0B', assigned: 3, completed: 1, rate: 33, badge: 'orange', status: '⚠️ En retard' },
    { name: 'Hiba', avatar: 'HI', color: '#EF4444', assigned: 2, completed: 0, rate: 0, badge: 'orange', status: '⚠️ En retard' }
  ]

  // Sprint Summary Mock Data
  const sprints = [
    { 
      name: 'Sprint 1 — Foundation', 
      status: '✅ TERMINÉ', badge: 'green', 
      dates: '01 jan → 14 jan', tasks: '4/4 (100%)', duration: '14 jours', highlight: null 
    },
    { 
      name: 'Sprint 2 — Core Platform', 
      status: '🔵 EN COURS', badge: 'blue', 
      dates: '15 jan → 28 jan', tasks: '3/6 (50%)', duration: '14 jours', highlight: '4 jours restants' 
    },
    { 
      name: 'Sprint 3 — IA Integration', 
      status: '⚫ À VENIR', badge: 'gray', 
      dates: '29 jan → 14 fév', tasks: '0/5 (0%)', duration: null, highlight: null 
    }
  ]

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25 }}
    >
      {/* HEADER */}
      <div className="page-head" style={{ marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: 'var(--text)' }}>📊 Rapports & Statistiques</h1>
          <p className="text-muted" style={{ marginTop: 6, fontSize: '15px' }}>
            Tableau de bord analytique de vos projets
          </p>
        </div>
        <div>
          <button className="btn btn-ghost" style={{ background: 'var(--bg)', border: '1px solid var(--border)', fontWeight: 600 }}>
            Projet: Plateforme e-Gestion (SaaS) <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* SUMMARY STATS ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginBottom: 32 }}>
        <StatCard title="Tâches Terminées" value="8/15" subtitle="53%" icon={<CheckCircle2 size={20}/>} color="green" />
        <StatCard title="En Cours" value="4 tâches" icon={<Clock size={20}/>} color="blue" subtitle="Actives" />
        <StatCard title="En Retard" value="2 tâches" icon={<AlertTriangle size={20}/>} color="red" subtitle="À revoir" />
        <StatCard title="Vélocité Sprint" value="5 tâches" icon={<Zap size={20}/>} color="purple" subtitle="Moyenne" />
      </div>

      {/* CHARTS ROW */}
      <div className="grid grid-3" style={{ marginBottom: 32 }}>
        
        {/* CHART 1: Tâches par Sprint */}
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: 16, fontWeight: 800 }}>📋 Tâches par Sprint</h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Nombre de tâches complétées dans chaque sprint</p>
          </div>
          <div className="card-body" style={{ height: 260, display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 20 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: 'var(--text-muted)' }} />
                  <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: 8, border: 'none', boxShadow: 'var(--shadow-lg)' }} />
                  <Bar dataKey="tasks" barSize={40} radius={[6, 6, 0, 0]}>
                    {barData.map((e, index) => <Cell key={index} fill={e.fill} />)}
                    <LabelList dataKey="tasks" position="top" fill="var(--text-muted)" fontSize={13} fontWeight={800} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}/> Terminé</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6' }}/> En cours</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: '#94a3b8' }}/> À venir</div>
            </div>
          </div>
        </div>

        {/* CHART 2: Statut des Tâches */}
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: 16, fontWeight: 800 }}>✅ Répartition des tâches</h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>État actuel de toutes les tâches du projet</p>
          </div>
          <div className="card-body" style={{ height: 260, display: 'flex', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1, height: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: 'var(--shadow-lg)' }} />
                  <Pie data={pieData} dataKey="value" innerRadius={55} outerRadius={80} stroke="none" paddingAngle={2}>
                    {pieData.map((e, index) => <Cell key={index} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                <div style={{ fontSize: 26, fontWeight: 900, lineHeight: 1 }}>15</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginTop: 4 }}>Tâches</div>
              </div>
            </div>
            <div style={{ width: 140, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {pieData.map((e) => (
                <div key={e.name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: e.color }} />
                  <div style={{ flex: 1 }}>{e.name}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>{e.percentage}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CHART 3: Progression */}
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: 16, fontWeight: 800 }}>📈 Progression du projet</h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Évolution du % de complétion au fil du temps</p>
          </div>
          <div className="card-body" style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: 'var(--text-muted)' }} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: 'var(--text-muted)' }} tickFormatter={(val) => `${val}%`} />
                <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: 'var(--shadow-lg)' }} />
                <Area type="monotone" dataKey="progress" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorProg)" />
                <ReferenceDot x="Avr" y={68} r={6} fill="#3b82f6" stroke="#fff" strokeWidth={2} label={{ position: 'top', value: "Aujourd'hui: 68%", fill: '#3b82f6', fontWeight: 800, fontSize: 12 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* TEAM PERFORMANCE TABLE */}
      <div className="card" style={{ marginBottom: 32 }}>
        <div className="card-header">
          <h3 style={{ fontSize: 18, fontWeight: 800 }}>👥 Performance de l'équipe</h3>
        </div>
        <div className="card-body" style={{ padding: 0, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)', fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '16px 24px' }}>Développeur</th>
                <th style={{ padding: '16px 24px' }}>Tâches assignées</th>
                <th style={{ padding: '16px 24px' }}>Tâches terminées</th>
                <th style={{ padding: '16px 24px' }}>Taux de complétion</th>
                <th style={{ padding: '16px 24px' }}>Statut</th>
              </tr>
            </thead>
            <tbody>
              {teamPerformance.map((user, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: user.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800 }}>
                      {user.avatar}
                    </div>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{user.name}</span>
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: 14, fontWeight: 600 }}>{user.assigned}</td>
                  <td style={{ padding: '16px 24px', fontSize: 14, fontWeight: 600 }}>{user.completed}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ flex: 1, height: 6, background: 'var(--bg)', borderRadius: 4, overflow: 'hidden', minWidth: 80 }}>
                        <div style={{ height: '100%', width: `${user.rate}%`, background: user.rate > 50 ? 'var(--success)' : 'var(--danger)', borderRadius: 4 }} />
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-muted)' }}>{user.rate}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span className={`badge badge-${user.badge}`}>
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SPRINT SUMMARY */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>🏃 Résumé des Sprints</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {sprints.map((sprint, idx) => (
            <div key={idx} className="card" style={{ padding: 24, borderTop: `4px solid var(--${sprint.badge === 'gray' ? 'border' : sprint.badge})` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <h4 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>{sprint.name}</h4>
                <div className={`badge badge-${sprint.badge}`}>{sprint.status}</div>
              </div>
              <div style={{ display: 'grid', gap: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Dates</span>
                  <span style={{ fontWeight: 700 }}>{sprint.dates}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Tâches</span>
                  <span style={{ fontWeight: 700 }}>{sprint.tasks}</span>
                </div>
                {sprint.duration && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Durée</span>
                    <span style={{ fontWeight: 700 }}>{sprint.duration}</span>
                  </div>
                )}
              </div>
              {sprint.highlight && (
                <div style={{ marginTop: 16, padding: '8px 12px', background: 'var(--primary-soft)', color: 'var(--primary)', borderRadius: 8, fontSize: 13, fontWeight: 700, textAlign: 'center' }}>
                  {sprint.highlight}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  )
}
