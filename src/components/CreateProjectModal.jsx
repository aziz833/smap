import React, { useMemo, useState, Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, X, Info, Users, Cpu, ArrowRight, ArrowLeft, Plus, Trash2, Loader2, AlertCircle, Check } from 'lucide-react'
import { useProjects } from '../context/ProjectContext.jsx'
import toast from 'react-hot-toast'

const steps = [
  { key: 'info', label: 'Info Projet', icon: <Info size={16} /> },
  { key: 'team', label: 'Équipe', icon: <Users size={16} /> },
  { key: 'ai', label: 'Analyse IA', icon: <Cpu size={16} /> },
]

function StepIndicator({ current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
      {steps.map((s, idx) => (
        <Fragment key={s.key}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div 
              style={{ 
                width: 28, 
                height: 28, 
                borderRadius: '50%', 
                background: idx <= current ? 'var(--primary)' : 'var(--border)', 
                color: idx <= current ? 'white' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 700,
                transition: 'all 0.3s ease'
              }}
            >
              {idx < current ? <CheckCircle2 size={16} /> : idx + 1}
            </div>
            <span style={{ 
              fontSize: 14, 
              fontWeight: idx <= current ? 700 : 500, 
              color: idx <= current ? 'var(--text)' : 'var(--text-muted)',
              transition: 'all 0.3s ease'
            }}>
              {s.label}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div style={{ flex: 1, height: 2, background: idx < current ? 'var(--primary)' : 'var(--border)', minWidth: 20 }} />
          )}
        </Fragment>
      ))}
    </div>
  )
}

export default function CreateProjectModal({ open, onClose }) {
  const { addProject, teamMembers } = useProjects()
  const [step, setStep] = useState(0)
  const [info, setInfo] = useState({
    name: '',
    description: '',
    budget: '',
    startDate: '',
    deadline: '',
  })
  const [errors, setErrors] = useState({})
  const [selectedTeams, setSelectedTeams] = useState([])
  const [aiState, setAiState] = useState({ running: false, phase: -1, done: false })

  const phases = [
    { label: "🔍 Agent Analyse en cours...", color: "#2563EB" },
    { label: "📋 Agent Planning en cours...", color: "#2563EB" },
    { label: "⚠️ Agent Risque en cours...", color: "#2563EB" },
    { label: "✅ Planning généré avec succès !", color: "#10B981" }
  ]

  const reset = () => {
    setStep(0)
    setInfo({ name: '', description: '', budget: '', startDate: '', deadline: '' })
    setErrors({})
    setSelectedTeams([])
    setAiState({ running: false, phase: -1, done: false })
  }

  const close = () => {
    if (aiState.running) return
    reset()
    onClose?.()
  }

  const validateStep1 = () => {
    const newErrors = {}
    if (!info.name.trim()) newErrors.name = "Le nom du projet est requis"
    if (!info.description.trim()) newErrors.description = "La description est requise"
    if (!info.startDate) newErrors.startDate = "La date de début est requise"
    if (!info.deadline) newErrors.deadline = "La deadline est requise"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (step === 0 && !validateStep1()) return
    setStep((s) => Math.min(2, s + 1))
  }

  const runAI = async () => {
    setAiState({ running: true, phase: 0, done: false })
    
    // Webhook call simulation
    try {
      fetch('http://localhost:5678/webhook/planning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: info.description,
          nb_devs: selectedTeams.length,
          date_debut: info.startDate,
          budget: info.budget
        })
      }).catch(() => console.log("Webhook mock (failed but expected)"))
    } catch (e) {}

    for (let i = 0; i < phases.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 1200))
      setAiState((s) => ({ ...s, phase: i }))
    }
    setAiState({ running: false, phase: phases.length - 1, done: true })
  }

  const create = () => {
    const selectedDevs = teamMembers.filter(m => selectedTeams.includes(m.email))
    const payload = {
      ...info,
      team: selectedDevs,
      technologies: ['React', 'Node.js', 'AI Agents'],
      requirements: [
        { label: 'Backlog initial', done: false },
        { label: 'Architecture', done: false },
        { label: 'Sprint 1', done: false },
      ],
      sprints: [],
      risks: [],
      progressHistory: [{ date: info.startDate, progress: 0 }]
    }

    addProject(payload)
    
    // Simulate email notification
    selectedDevs.forEach(dev => {
      console.log(`📧 Notification envoyée à ${dev.name} (${dev.email}): Vous avez été assigné au nouveau projet "${info.name}"`)
    })

    toast.success('✅ Projet créé avec succès !')
    close()
  }

  return (
    <>
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            className="modal"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            style={{ padding: '0' }}
          >
            <div style={{ padding: '32px 40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <h2 style={{ fontSize: 24, fontWeight: 800 }}>Nouveau Projet</h2>
                <button className="icon-btn" onClick={close} disabled={aiState.running}><X size={20} /></button>
              </div>


            <StepIndicator current={step} />

            <div style={{ minHeight: 340 }}>
              {step === 0 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <div style={{ display: 'grid', gap: 20 }}>
                    <div className="field">
                      <label className="label">Nom du projet*</label>
                      <div style={{ position: 'relative' }}>
                        <Info size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input 
                          className={`input ${errors.name ? 'error' : ''}`} 
                          style={{ paddingLeft: 44 }}
                          placeholder="ex: Plateforme E-commerce"
                          value={info.name} 
                          onChange={(e) => setInfo({ ...info, name: e.target.value })} 
                        />
                      </div>
                      {errors.name && <span style={{ color: 'var(--danger)', fontSize: 12, fontWeight: 600 }}>{errors.name}</span>}
                    </div>

                    <div className="field">
                      <label className="label">Description*</label>
                      <textarea 
                        className={`input ${errors.description ? 'error' : ''}`} 
                        style={{ minHeight: 100, padding: 14 }}
                        placeholder="Décrivez les objectifs du projet..."
                        value={info.description} 
                        onChange={(e) => setInfo({ ...info, description: e.target.value })} 
                      />
                      {errors.description && <span style={{ color: 'var(--danger)', fontSize: 12, fontWeight: 600 }}>{errors.description}</span>}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                      <div className="field">
                        <label className="label">Budget</label>
                        <div style={{ position: 'relative' }}>
                          <input 
                            className="input" 
                            type="number"
                            placeholder="0"
                            style={{ paddingRight: 44 }}
                            value={info.budget} 
                            onChange={(e) => setInfo({ ...info, budget: e.target.value })} 
                          />
                          <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: 'var(--text-muted)' }}>DT</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                      <div className="field">
                        <label className="label">Date début*</label>
                        <input 
                          className={`input ${errors.startDate ? 'error' : ''}`} 
                          type="date"
                          value={info.startDate} 
                          onChange={(e) => setInfo({ ...info, startDate: e.target.value })} 
                        />
                      </div>
                      <div className="field">
                        <label className="label">Deadline*</label>
                        <input 
                          className={`input ${errors.deadline ? 'error' : ''}`} 
                          type="date"
                          value={info.deadline} 
                          onChange={(e) => setInfo({ ...info, deadline: e.target.value })} 
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <div style={{ marginBottom: 24 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Sélection de l'équipe</h3>
                    <p className="text-muted" style={{ fontSize: 14 }}>Sélectionnez les développeurs à assigner à ce projet.</p>
                  </div>

                  <div style={{ display: 'grid', gap: 12 }}>
                    {teamMembers.map((dev) => (
                      <label 
                        key={dev.email} 
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between', 
                          padding: '12px 16px', 
                          background: selectedTeams.includes(dev.email) ? 'var(--primary-soft)' : 'var(--bg)', 
                          borderRadius: 12, 
                          border: `1px solid ${selectedTeams.includes(dev.email) ? 'var(--primary)' : 'var(--border)'}`,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div 
                            style={{ 
                              width: 36, 
                              height: 36, 
                              borderRadius: '50%', 
                              background: dev.color, 
                              color: '#fff', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              fontWeight: 700, 
                              fontSize: 13 
                            }}
                          >
                            {dev.avatar}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: 14 }}>{dev.name}</div>
                            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{dev.email}</div>
                          </div>
                        </div>
                        <input 
                          type="checkbox" 
                          hidden 
                          checked={selectedTeams.includes(dev.email)}
                          onChange={() => {
                            if (selectedTeams.includes(dev.email)) {
                              setSelectedTeams(selectedTeams.filter(e => e !== dev.email))
                            } else {
                              setSelectedTeams([...selectedTeams, dev.email])
                            }
                          }}
                        />
                        <div 
                          style={{ 
                            width: 20, 
                            height: 20, 
                            borderRadius: 6, 
                            border: '2px solid', 
                            borderColor: selectedTeams.includes(dev.email) ? 'var(--primary)' : 'var(--border)',
                            background: selectedTeams.includes(dev.email) ? 'var(--primary)' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {selectedTeams.includes(dev.email) && <Check size={14} strokeWidth={3} />}
                        </div>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  {!aiState.done && !aiState.running ? (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                      <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                        <Cpu size={40} color="var(--primary)" />
                      </div>
                      <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>Analyse Intelligente</h3>
                      <p className="text-muted" style={{ marginBottom: 32 }}>L'IA va analyser votre projet pour générer un planning optimal et identifier les risques.</p>
                      <button className="btn btn-primary" style={{ width: '100%', height: 56, fontSize: 16 }} onClick={runAI}>
                        🚀 Lancer l'analyse IA
                      </button>
                    </div>
                  ) : aiState.running ? (
                    <div style={{ padding: '20px 0' }}>
                      {phases.map((p, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, opacity: idx > aiState.phase ? 0.3 : 1, transition: 'all 0.3s ease' }}>
                          <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {idx < aiState.phase ? (
                              <CheckCircle2 size={24} color="#10B981" />
                            ) : idx === aiState.phase ? (
                              <Loader2 size={24} color="#2563EB" className="spin" />
                            ) : (
                              <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--border)' }} />
                            )}
                          </div>
                          <span style={{ fontWeight: idx === aiState.phase ? 700 : 500, fontSize: 16 }}>{p.label}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'grid', gap: 20 }}>
                      <div className="card" style={{ background: 'var(--primary-soft)', border: 'none' }}>
                        <div className="card-body">
                          <h4 style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, color: 'var(--primary)' }}>
                            <CheckCircle2 size={18} /> Besoins identifiés
                          </h4>
                          <ul style={{ fontSize: 14, color: 'var(--text)', display: 'grid', gap: 6, listStyle: 'none' }}>
                            {["Authentification sécurisée", "Base de données relationnelle", "API RESTful", "Interface responsive"].map(r => (
                              <li key={r} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--primary)' }} /> {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="card" style={{ border: '1px solid var(--border)' }}>
                        <div className="card-body">
                          <h4 style={{ marginBottom: 12 }}>Sprints suggérés</h4>
                          <div style={{ display: 'grid', gap: 8 }}>
                            {["Sprint 1: Cadrage & UI (1 sem.)", "Sprint 2: Core Backend (3 sem.)", "Sprint 3: Intégration (2 sem.)"].map((s, i) => (
                              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '8px 12px', background: 'var(--bg)', borderRadius: 8 }}>
                                <span>{s}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div style={{ padding: 16, background: '#FEF2F2', borderRadius: 16, border: '1px solid #FEE2E2' }}>
                          <div style={{ color: '#EF4444', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>Risques</div>
                          <div style={{ fontSize: 12, color: '#991B1B' }}>Délai serré, Complexité API</div>
                        </div>
                        <div style={{ padding: 16, background: '#ECFDF5', borderRadius: 16, border: '1px solid #D1FAE5' }}>
                          <div style={{ color: '#10B981', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>Confiance</div>
                          <div style={{ fontSize: 12, color: '#065F46' }}>Élevée (85%)</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>

            <div style={{ marginTop: 40, display: 'flex', justifyContent: 'space-between', gap: 16 }}>
              <button 
                className="btn btn-ghost" 
                style={{ flex: 1, border: 'none' }}
                onClick={step === 0 ? close : () => setStep(step - 1)}
                disabled={aiState.running}
              >
                {step === 0 ? 'Annuler' : <><ArrowLeft size={18} /> Retour</>}
              </button>
              
              {step < 2 ? (
                <button 
                  className="btn btn-primary" 
                  style={{ flex: 2, height: 50 }}
                  onClick={nextStep}
                >
                  Suivant <ArrowRight size={18} />
                </button>
              ) : (
                <button 
                  className="btn btn-primary" 
                  style={{ flex: 2, height: 50, background: '#10B981' }}
                  onClick={create}
                  disabled={!aiState.done}
                >
                  ✅ Créer le projet
                </button>
              )}
            </div>
            </div>
          </motion.div>
        </motion.div>
      )}

    </AnimatePresence>
    <style dangerouslySetInnerHTML={{ __html: `
      .input.error {
        border-color: var(--danger);
        background: #fef2f2;
      }
      .spin {
        animation: spin 1s linear infinite;
      }
      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    `}} />
    </>
  )
}

