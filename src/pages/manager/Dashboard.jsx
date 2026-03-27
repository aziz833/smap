import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, FolderKanban, Users, ShieldAlert, Plus } from 'lucide-react'
import StatCard from '../../components/StatCard.jsx'
import ProjectCard from '../../components/ProjectCard.jsx'
import Calendar from '../../components/Calendar.jsx'
import CreateProjectModal from '../../components/CreateProjectModal.jsx'
import ChatBot from '../../components/ChatBot.jsx'
import { useProjects } from '../../context/ProjectContext.jsx'

export default function Dashboard() {
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const { projects } = useProjects()

  const stats = useMemo(() => {
    const total = projects.length
    const inProgress = projects.filter((p) => p.status === 'En cours').length
    const risks = projects.reduce((acc, p) => acc + (p.risks?.length || 0), 0)
    const members = new Set(
      projects.flatMap((p) => (p.team || []).map((m) => m.email)),
    ).size
    return { total, inProgress, risks, members }
  }, [projects])

  const openProject = (p) => {
    navigate(`/projects/${p.id}`)
  }

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
          <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text)' }}>Dashboard</h1>
          <p className="text-muted" style={{ marginTop: 8, fontSize: '15px' }}>
            Pilotage intelligent des projets et des équipes.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          <Plus size={18} /> Nouveau Projet
        </button>
      </div>

      <div className="grid grid-3" style={{ marginBottom: 32 }}>
        <StatCard
          title="Total Projets"
          value={stats.total}
          color="blue"
          icon={<FolderKanban size={20} />}
          subtitle="Projets globaux"
        />
        <StatCard
          title="En Cours"
          value={stats.inProgress}
          color="purple"
          icon={<Users size={20} />}
          subtitle="Sprints actifs"
        />
        <StatCard
          title="Risques"
          value={stats.risks}
          color="red"
          icon={<AlertTriangle size={20} />}
          subtitle="Points de vigilance"
        />
      </div>


      <div className="grid" style={{ gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }}>
        <div className="card">
          <div className="card-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '18px', fontWeight: 700 }}>Projets Récents</span>
            <div className="badge badge-blue">{projects.length}</div>
          </div>
          <div className="card-body">
            <div className="grid grid-3">
              {projects.map((p, idx) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05, duration: 0.2 }}
                >
                  <ProjectCard project={p} onClick={() => openProject(p)} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header" style={{ fontSize: '18px', fontWeight: 700 }}>Planning</div>
          <div className="card-body">
            <Calendar projects={projects} onOpenProject={openProject} />
          </div>
        </div>
      </div>

      <CreateProjectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <ChatBot />
    </motion.div>
  )
}
