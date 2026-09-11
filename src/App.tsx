import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute, AdminRoute } from '@/routes/ProtectedRoute'

import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'
import Dashboard from '@/pages/Dashboard'
import SpacesList from '@/pages/spaces/SpacesList'
import SpaceDetail from '@/pages/spaces/SpaceDetail'
import ProjectLayout from '@/pages/projects/ProjectLayout'
import ProjectOverview from '@/pages/projects/ProjectOverview'
import ProjectMaterials from '@/pages/projects/ProjectMaterials'
import ProjectTutor from '@/pages/projects/ProjectTutor'
import ProjectQuiz from '@/pages/projects/ProjectQuiz'
import ProjectAssessment from '@/pages/projects/ProjectAssessment'
import ProjectGrowth from '@/pages/projects/ProjectGrowth'
import ProjectAnalytics from '@/pages/projects/ProjectAnalytics'
import GlobalAnalytics from '@/pages/GlobalAnalytics'
import ActivityPage from '@/pages/Activity'
import Settings from '@/pages/Settings'

import AdminDashboard from '@/pages/admin/AdminDashboard'
import AdminUsers from '@/pages/admin/AdminUsers'
import AdminUserDetail from '@/pages/admin/AdminUserDetail'
import AdminProjects from '@/pages/admin/AdminProjects'
import AdminActivity from '@/pages/admin/AdminActivity'
import AdminLearningAnalytics from '@/pages/admin/AdminLearningAnalytics'
import AdminAIUsage from '@/pages/admin/AdminAIUsage'
import AdminAIEvaluation from '@/pages/admin/AdminAIEvaluation'
import AdminSystemHealth from '@/pages/admin/AdminSystemHealth'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/app" element={<Navigate to="/app/dashboard" replace />} />
      <Route path="/app/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/app/spaces" element={<ProtectedRoute><SpacesList /></ProtectedRoute>} />
      <Route path="/app/spaces/:spaceId" element={<ProtectedRoute><SpaceDetail /></ProtectedRoute>} />

      <Route path="/app/projects/:projectId" element={<ProtectedRoute><ProjectLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<ProjectOverview />} />
        <Route path="materials" element={<ProjectMaterials />} />
        <Route path="tutor" element={<ProjectTutor />} />
        <Route path="quiz" element={<ProjectQuiz />} />
        <Route path="assessment" element={<ProjectAssessment />} />
        <Route path="growth" element={<ProjectGrowth />} />
        <Route path="analytics" element={<ProjectAnalytics />} />
      </Route>

      <Route path="/app/analytics" element={<ProtectedRoute><GlobalAnalytics /></ProtectedRoute>} />
      <Route path="/app/activity" element={<ProtectedRoute><ActivityPage /></ProtectedRoute>} />
      <Route path="/app/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
      <Route path="/admin/users/:userId" element={<AdminRoute><AdminUserDetail /></AdminRoute>} />
      <Route path="/admin/projects" element={<AdminRoute><AdminProjects /></AdminRoute>} />
      <Route path="/admin/activity" element={<AdminRoute><AdminActivity /></AdminRoute>} />
      <Route path="/admin/analytics" element={<AdminRoute><AdminLearningAnalytics /></AdminRoute>} />
      <Route path="/admin/ai-usage" element={<AdminRoute><AdminAIUsage /></AdminRoute>} />
      <Route path="/admin/ai-evaluation" element={<AdminRoute><AdminAIEvaluation /></AdminRoute>} />
      <Route path="/admin/system-health" element={<AdminRoute><AdminSystemHealth /></AdminRoute>} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
