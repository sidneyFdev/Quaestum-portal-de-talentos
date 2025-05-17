import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('token') 

  return isAuthenticated ? children : <Navigate to="/auth/login" replace />
}