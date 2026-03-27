import React, { useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Mail, Network, AlertCircle } from 'lucide-react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { roleHomePath, useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [successCheck, setSuccessCheck] = useState(false)

  const from = useMemo(() => location.state?.from, [location.state])

  if (user) return <Navigate to={from || roleHomePath(user.role)} replace />

  const fillAccount = (e, p) => {
    setEmail(e)
    setPassword(p)
    setSuccessCheck(true)
    setTimeout(() => setSuccessCheck(false), 2000)
    toast.success('Champs remplis !')
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const u = await login({ email, password })
      toast.success('Connexion réussie')
      navigate(from || roleHomePath(u.role), { replace: true })
    } catch (err) {
      setError(err?.message || 'Erreur de connexion.')
    } finally {
      setLoading(false)
    }
  }

  const accounts = [
    { role: 'Manager', email: 'manager@pfe.com', pass: 'Manager123', color: 'blue' },
    { role: 'Développeur', email: 'dev@pfe.com', pass: 'Dev123', color: 'green' },
    { role: 'Client', email: 'client@pfe.com', pass: 'Client123', color: 'orange' },
  ]

  return (
    <div className="login-bg">
      <div className="floating-circles">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="circle" 
            style={{ 
              width: Math.random() * 300 + 100, 
              height: Math.random() * 300 + 100, 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 10 + 15}s`
            }} 
          />
        ))}
      </div>

      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ padding: '40px 48px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Network size={34} color="#2563EB" strokeWidth={2.5} />
              <div style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.02em', display: 'flex' }}>
                <span style={{ color: '#0F172A' }}>NET</span>
                <span style={{ color: '#2563EB' }}>INFO</span>
              </div>
            </div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Système Multi-Agent
            </div>
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>Bienvenue sur SMA</h2>
          <p style={{ fontSize: '13px', color: '#64748B' }}>Système Multi-Agent de Gestion de Projets IT</p>
        </div>

        <form onSubmit={onSubmit} style={{ display: 'grid', gap: '16px' }}>
          <div className="field">
            <div style={{ position: 'relative' }}>
              <Mail 
                size={18} 
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} 
              />
              <input
                className="input"
                type="email"
                placeholder="Adresse email"
                style={{ paddingLeft: '44px', height: '48px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <div style={{ position: 'relative' }}>
              <Lock 
                size={18} 
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} 
              />
              <input
                className="input"
                type={showPassword ? 'text' : 'password'}
                placeholder="Mot de passe"
                style={{ paddingLeft: '44px', paddingRight: '44px', height: '48px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button className="btn btn-login" disabled={loading} style={{ position: 'relative' }}>
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="spinner-small" />
                <span>Connexion en cours...</span>
              </div>
            ) : 'Se connecter'}
            {successCheck && !loading && (
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', color: '#10B981' }}
              >
                <div style={{ background: '#fff', borderRadius: '50%', padding: 2, display: 'flex' }}><AlertCircle size={16} /></div>
              </motion.div>
            )}
          </button>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ 
                background: '#FEF2F2', 
                color: '#EF4444', 
                padding: '12px 16px', 
                borderRadius: '12px', 
                fontSize: '14px', 
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                border: '1px solid #FEE2E2'
              }}
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}
        </form>

        {/* Test Accounts Section */}
        <div style={{ marginTop: '24px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#1E40AF', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: 6 }}>
            🔑 Comptes de test
          </div>
          <div style={{ height: '1px', background: '#BFDBFE', marginBottom: '12px' }} />
          
          <div style={{ display: 'grid', gap: '10px' }}>
            {accounts.map((acc) => (
              <div key={acc.role} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ 
                    fontSize: '10px', 
                    fontWeight: 700, 
                    padding: '2px 8px', 
                    borderRadius: '99px', 
                    background: acc.color === 'blue' ? '#DBEAFE' : acc.color === 'green' ? '#D1FAE5' : '#FFEDD5',
                    color: acc.color === 'blue' ? '#1E40AF' : acc.color === 'green' ? '#065F46' : '#9A3412',
                    textTransform: 'uppercase'
                  }}>
                    {acc.role}
                  </span>
                  <div style={{ display: 'grid' }}>
                    <code style={{ fontSize: '11px', color: '#64748B' }}>{acc.email}</code>
                    <code style={{ fontSize: '11px', color: '#94A3B8' }}>{acc.pass}</code>
                  </div>
                </div>
                <button 
                  type="button" 
                  onClick={() => fillAccount(acc.email, acc.pass)}
                  style={{ 
                    fontSize: '11px', 
                    fontWeight: 700, 
                    color: '#2563EB', 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: '6px'
                  }}
                  onMouseOver={(e) => e.target.style.background = '#DBEAFE'}
                  onMouseOut={(e) => e.target.style.background = 'none'}
                >
                  Utiliser →
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '12px', color: '#94A3B8', fontWeight: 500 }}>
          NETINFO © 2026 — NetInfo Nabeul
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .spinner-small {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}} />
    </div>
  )
}

