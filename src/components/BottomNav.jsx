import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Calendar, Users, Briefcase } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

export default function BottomNav() {
  const { user } = useAuth()
  const isManager = user?.role === 'manager'

  const links = isManager 
    ? [
        { to: '/manager-dashboard', icon: <LayoutDashboard size={20} />, label: 'Tableau' },
        { to: '/projets', icon: <Briefcase size={20} />, label: 'Projets' },
        { to: '/equipe', icon: <Users size={20} />, label: 'Équipe' },
        { to: '/calendrier', icon: <Calendar size={20} />, label: 'Planning' },
      ]
    : [
        { to: '/dev-dashboard', icon: <LayoutDashboard size={20} />, label: 'Tâches' },
        { to: '/mes-projets', icon: <Briefcase size={20} />, label: 'Projets' },
        { to: '/calendrier', icon: <Calendar size={20} />, label: 'Planning' },
      ]

  return (
    <nav className="bottom-nav">
      {links.map((link) => (
        <NavLink 
          key={link.to} 
          to={link.to} 
          className={({ isActive }) => `bottom-nav-link ${isActive ? 'active' : ''}`}
        >
          {link.icon}
          <span>{link.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
