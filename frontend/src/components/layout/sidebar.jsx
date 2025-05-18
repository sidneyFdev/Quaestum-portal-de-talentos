import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {

    const [token , setToken] = useState(null)

    const Logout = async () => {
        console.log(token)
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}user/logout`,
                {
                    email: 'admin@example.com'
                }, 
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log(response.data)
        }catch (err){
            console.error('Erro no logout:', err.response?.data || err.message)
        }
    }

    useEffect(() => {
        let cachedToken = localStorage.getItem('token')

        setToken(cachedToken)
    }, [])

    return (
        <div 
            className="relative px-4 py-8 w-full flex flex-col bg-(--card-background-color) justify-self-start h-full z-10"
        >
            <nav className='absolute bottom-4 max-w-3xs'>
                <button 
                
                onClick={()=>Logout()}
                type="button">
                    Logout
                </button>
                <Link 
                    to={{
                        pathname:"/admin/login"
                    }}
                >
                <FontAwesomeIcon icon={faUserAlt} /> Área do Recrutador
                </Link>

            </nav>
        </div>
    )
}

export default SideBar