import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  BarChart3, 
  LogOut, 
  Network, 
  MessageSquare, 
  ShieldAlert, 
  Globe, 
  FileText, 
  Settings, 
  ClipboardList, 
  User, 
  GanttChart 
} from 'lucide-react'

import { useAuth } from '../context/AuthContext.jsx'

function initials(name) {
  const parts = String(name || '').trim().split(' ').filter(Boolean)
  const a = parts[0]?.[0] ?? 'S'
  const b = parts[1]?.[0] ?? 'M'
  return (a + b).toUpperCase()
}

function navLinkClass({ isActive }) {
  return `nav-item${isActive ? ' active' : ''}`
}

export default function Sidebar({ variant = 'desktop', onNavigate }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleNav = () => {
    if (typeof onNavigate === 'function') onNavigate()
  }

  const renderNav = () => {
    if (user?.role === 'manager') {
      return (
        <nav className="nav">
          <div className="nav-group-label" style={{ padding: '8px 12px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Pilotage</div>
          <NavLink to="/dashboard" className={navLinkClass} onClick={handleNav}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
          <NavLink to="/dashboard" className={navLinkClass} onClick={handleNav}>
            <ClipboardList size={18} /> Projets
          </NavLink>
          <NavLink to="/reports" className={navLinkClass} onClick={handleNav}>
            <BarChart3 size={18} /> Rapports
          </NavLink>
          
          <div className="nav-group-label" style={{ padding: '16px 12px 8px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Équipe & Outils</div>
          <NavLink to="/calendrier" className={navLinkClass} onClick={handleNav}>
            <Calendar size={18} /> Planning
          </NavLink>
          <NavLink to="/team" className={navLinkClass} onClick={handleNav}>
            <Users size={18} /> Équipe
          </NavLink>
          <NavLink to="/messages" className={navLinkClass} onClick={handleNav}>
            <MessageSquare size={18} /> Messages
          </NavLink>
          <NavLink to="/dashboard" className={navLinkClass} onClick={handleNav}>
            <Settings size={18} /> Paramètres
          </NavLink>

        </nav>
      )
    }

    if (user?.role === 'developer') {
      return (
        <nav className="nav">
          <NavLink to="/dev-dashboard" className={navLinkClass} onClick={handleNav}>
            <ClipboardList size={18} /> Mes Tâches
          </NavLink>
          <NavLink to="/calendrier" className={navLinkClass} onClick={handleNav}>
            <GanttChart size={18} /> Planning
          </NavLink>
          <NavLink to="/messages" className={navLinkClass} onClick={handleNav}>
            <MessageSquare size={18} /> Messages
          </NavLink>
          <NavLink to="/profil" className={navLinkClass} onClick={handleNav}>
            <User size={18} /> Profil
          </NavLink>
        </nav>
      )
    }

    if (user?.role === 'client') {
      return (
        <nav className="nav">
          <NavLink to="/client-dashboard" className={navLinkClass} onClick={handleNav}>
            <LayoutDashboard size={18} /> Mon Projet
          </NavLink>
          <NavLink to="/client-dashboard" className={navLinkClass} onClick={handleNav}>
            <FileText size={18} /> Rapports
          </NavLink>
          <NavLink to="/profil" className={navLinkClass} onClick={handleNav}>
            <User size={18} /> Profil
          </NavLink>
        </nav>
      )
    }
  }

  return (
    <aside className={variant === 'drawer' ? 'drawer' : 'sidebar'}>
      <div className="sidebar-brand" style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Network size={24} color="#2563EB" strokeWidth={2.5} />
          <div style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.02em', display: 'flex' }}>
            <span style={{ color: variant === 'drawer' ? '#0F172A' : '#0F172A' }}>NET</span>
            <span style={{ color: '#2563EB' }}>INFO</span>
          </div>
        </div>
        <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', marginLeft: '34px', marginTop: '-2px' }}>
          SMA (Système Multi-Agent)
        </div>
      </div>

      <div onClick={handleNav} role="presentation" style={{ flex: 1 }}>
        {renderNav()}
      </div>

      <div className="sidebar-footer">
        <button className="icon-btn" style={{ background: 'var(--border)', color: 'var(--text)', gap: 8 }} onClick={() => console.log('Settings clicked')}>
          <Settings size={18} />
          <span style={{ fontSize: 13, fontWeight: 700 }}>Paramètres</span>
        </button>
        <div className="user-chip" style={{ background: 'var(--primary-soft)', border: '1px solid var(--border-light)' }}>
          <div className="avatar">{initials(user?.name)}</div>
          <div style={{ display: 'grid', lineHeight: 1.2 }}>
            <div style={{ fontWeight: 700, fontSize: '14px' }}>{user?.name}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{user?.role}</div>
          </div>
        </div>

        <button className="btn btn-ghost btn-full" onClick={handleLogout} style={{ border: 'none', background: 'transparent', justifyContent: 'flex-start', padding: '10px 12px' }}>
          <LogOut size={16} /> Se déconnecter
        </button>
      </div>
    </aside>
  )
}
