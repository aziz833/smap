import React, { createContext, useContext, useState, useEffect } from 'react'
import { projects as initialProjects } from '../data/mockData'

const ProjectContext = createContext()

export const teamMembers = [
  { id: 'dev1', name: 'Aziz Benrejeb', email: 'Azizbenrejeb@gmail.com', avatar: 'AB', color: '#3B82F6' },
  { id: 'dev2', name: 'Mohamed Amine', email: 'mohmedamine@gmail.com', avatar: 'MA', color: '#10B981' },
  { id: 'dev3', name: 'Yosr', email: 'yosr@gmail.com', avatar: 'YO', color: '#F59E0B' },
  { id: 'dev4', name: 'Hiba', email: 'hiba@gmail.com', avatar: 'HI', color: '#EF4444' },
  { id: 'dev5', name: 'Tasnim', email: 'tasnim@gmail.com', avatar: 'TA', color: '#8B5CF6' },
]

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    return (initialProjects || []).map(p => ({
      ...p,
      team: (p.team || []).map((m, idx) => ({
        ...m,
      })),
      risks: p.risks || [],
      sprints: p.sprints || [],
    }))
  })

  const addProject = (newProject) => {
    setProjects((prev) => [
      {
        ...newProject,
        id: `p-${Date.now()}`,
        status: 'Nouveau',
        progress: 0,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ])
  }

  return (
    <ProjectContext.Provider value={{ projects, setProjects, addProject, teamMembers }}>
      {children}
    </ProjectContext.Provider>
  )
}

export const useProjects = () => {
  const context = useContext(ProjectContext)
  if (!context) throw new Error('useProjects must be used within a ProjectProvider')
  return context
}
