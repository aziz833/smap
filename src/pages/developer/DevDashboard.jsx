import React, { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext.jsx'
import TaskCard from '../../components/TaskCard.jsx'
import TaskDetailPanel from '../../components/TaskDetailPanel.jsx'
import ConfirmTaskModal from '../../components/ConfirmTaskModal.jsx'
import ProgressCircle from '../../components/ProgressCircle.jsx'
import { devTasksToday } from '../../data/mockData.js'
import CountUp from '../../components/CountUp.jsx'
import { Clock, CheckCircle2, Zap, BarChart3, Calendar } from 'lucide-react'

export default function DevDashboard() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState(devTasksToday)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [pendingTaskId, setPendingTaskId] = useState(null)
  const [stats, setStats] = useState({ done: 0, total: 0, hours: 0 })
  const [viewingTask, setViewingTask] = useState(null)

  useEffect(() => {
    const done = tasks.filter(t => t.status === 'Terminé').length
    const total = tasks.length
    const hours = 6 + done * 1.5
    setStats({ done, total, hours })
  }, [tasks])

  const pendingTask = useMemo(
    () => tasks.find((t) => t.id === pendingTaskId),
    [tasks, pendingTaskId],
  )

  const changeStatus = (taskId, nextStatus) => {
    if (nextStatus === 'Terminé') {
      setPendingTaskId(taskId)
      setConfirmOpen(true)
      return
    }
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: nextStatus } : t)))
  }

  const confirmDone = ({ comment }) => {
    setTasks((prev) => prev.map((t) => (t.id === pendingTaskId ? { ...t, status: 'Terminé' } : t)))
    if (viewingTask && viewingTask.id === pendingTaskId) {
      setViewingTask(null)
    }
    toast.success('Excellent travail ! Points d\'expérience gagnés.')
  }

  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
  const completionRate = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header style={{ marginBottom: 40 }}>
        <motion.h1 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          style={{ fontSize: 32, fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}
        >
          Bonjour {user?.name} 👋
        </motion.h1>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-muted)', fontSize: 16, fontWeight: 500 }}>
            <Calendar size={18} />
            <span style={{ textTransform: 'capitalize' }}>{today}</span>
          </div>
          <div style={{ background: 'var(--primary-soft)', color: 'var(--primary)', padding: '8px 16px', borderRadius: 12, fontWeight: 700, fontSize: 14 }}>
            🔥 Vous avez {stats.total - stats.done} tâches à compléter aujourd'hui
          </div>
        </div>
      </header>

      <div className="grid" style={{ gridTemplateColumns: 'minmax(0, 70%) minmax(0, 30%)', gap: 24, alignItems: 'start' }}>
        {/* Left Side: Tasks */}
        <div style={{ display: 'grid', gap: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Zap size={20} color="var(--primary)" /> Tâches prioritaires
          </h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <AnimatePresence>
              {tasks.map((t, idx) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <TaskCard
                    task={t}
                    onStatusChange={(s) => changeStatus(t.id, s)}
                    onClick={() => setViewingTask(t)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Stats */}
        <div style={{ display: 'grid', gap: 24 }}>
          <motion.div 
            className="card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="card-header" style={{ fontWeight: 800, fontSize: 16 }}>🎯 Mes Stats</div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <ProgressCircle value={completionRate} size={140} />
              <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, width: '100%' }}>
                <div style={{ padding: 16, background: 'var(--bg)', borderRadius: 16 }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: 'var(--primary)' }}><CountUp end={stats.done} />/<CountUp end={stats.total} /></div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>TERMINÉES</div>
                </div>
                <div style={{ padding: 16, background: 'var(--bg)', borderRadius: 16 }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: 'var(--primary)' }}><CountUp end={stats.hours} suffix="h" /></div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>LOGGÉES</div>
                </div>
              </div>
            </div>
          </motion.div>


          <motion.div 
            className="card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="card-header" style={{ fontWeight: 800, fontSize: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <BarChart3 size={18} /> Mon Sprint
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>Sprint 2: Core Platform</span>
                <span className="badge badge-blue">4 jours restants</span>
              </div>
              <div className="progress" style={{ height: 10, background: '#f1f5f9' }}>
                <motion.div
                  className="progress-bar"
                  initial={{ width: 0 }}
                  animate={{ width: '68%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <div style={{ marginTop: 24, padding: 16, background: 'rgba(37, 99, 235, 0.05)', borderRadius: 12, border: '1px dashed rgba(37, 99, 235, 0.2)' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>Prochain Sprint</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Refonte API & Intégration Sécurité locale</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <ConfirmTaskModal
        open={confirmOpen}
        task={pendingTask}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDone}
      />
      
      <TaskDetailPanel 
        task={viewingTask} 
        isOpen={!!viewingTask} 
        onClose={() => setViewingTask(null)} 
      />
    </motion.div>
  )
}

