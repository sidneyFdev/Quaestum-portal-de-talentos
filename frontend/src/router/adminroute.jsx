// navigation/AdminRoute.jsx
import { Navigate } from 'react-router-dom'

export default function AdminRoute({ children }) {
  const isAdmin = localStorage.getItem('role') === 'admin'

  return isAdmin ? children : <Navigate to="/admin/login" replace />
}
