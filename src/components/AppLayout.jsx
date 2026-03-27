import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Sidebar from './Sidebar.jsx'
import BottomNav from './BottomNav.jsx'
import TopNavbar from './TopNavbar.jsx'

export default function AppLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="app-shell">
      <Sidebar />

      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1, position: 'relative' }}>
        <div className="mobile-topbar" style={{ zIndex: 50 }}>
          <button className="icon-btn" onClick={() => setDrawerOpen(true)} aria-label="Ouvrir le menu">
            <Menu size={20} />
          </button>
          <div className="brand-name" style={{ fontSize: '18px', fontWeight: 800 }}>
            <span style={{ color: 'var(--text)' }}>NET</span>
            <span style={{ color: 'var(--primary)' }}>INFO</span>
          </div>
          <div style={{ width: 34 }} />
        </div>

        <TopNavbar />

        <main className="main" style={{ flex: 1 }}>
          <Outlet />
        </main>

        <BottomNav />
      </div>


      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{ position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 110, width: '280px' }}
            >
              <div style={{ position: 'relative', height: '100%' }}>
                <button 
                  className="icon-btn" 
                  onClick={() => setDrawerOpen(false)} 
                  style={{ position: 'absolute', top: 16, right: 16, zIndex: 120 }}
                >
                  <X size={20} />
                </button>
                <Sidebar variant="drawer" onNavigate={() => setDrawerOpen(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
