import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Login from './pages/Login.jsx'
import Dashboard from './pages/manager/Dashboard.jsx'
import ManagerCalendar from './pages/manager/CalendarPage.jsx'
import ProjectDetail from './pages/manager/ProjectDetail.jsx'
import ManagerReports from './pages/manager/Reports.jsx'
import Team from './pages/manager/Team.jsx'
import DevDashboard from './pages/developer/DevDashboard.jsx'
import DevProfile from './pages/developer/DevProfile.jsx'
import ClientDashboard from './pages/client/ClientDashboard.jsx'
import Messages from './pages/shared/Messages.jsx'
import { roleHomePath, useAuth } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AppLayout from './components/AppLayout.jsx'
import { ProjectProvider } from './context/ProjectContext.jsx'

function IndexRedirect() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return <Navigate to={roleHomePath(user.role)} replace />
}

export default function App() {
  const location = useLocation()

  return (
    <ProjectProvider>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<IndexRedirect />} />
        <Route path="/login" element={<Login />} />

        <Route
          element={
            <ProtectedRoute roles={['manager', 'developer', 'client']}>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={['manager']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendrier"
            element={
              <ProtectedRoute roles={['manager']}>
                <ManagerCalendar />
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute roles={['manager']}>
                <ProjectDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute roles={['manager']}>
                <ManagerReports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/team"
            element={
              <ProtectedRoute roles={['manager']}>
                <Team />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dev-dashboard"
            element={
              <ProtectedRoute roles={['developer']}>
                <DevDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/client-dashboard"
            element={
              <ProtectedRoute roles={['client']}>
                <ClientDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profil"
            element={
              <ProtectedRoute roles={['developer', 'client']}>
                <DevProfile />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/messages"
            element={
              <ProtectedRoute roles={['manager', 'developer']}>
                <Messages />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ProjectProvider>
  )
}
