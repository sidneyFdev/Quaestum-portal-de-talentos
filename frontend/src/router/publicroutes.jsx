import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../provider/auth_provider'

const PublicRoute = () => {
    const {token} = useContext(AuthContext)

    return !token ? <Outlet/> : <Navigate to="/home" />
}

export default PublicRoute

