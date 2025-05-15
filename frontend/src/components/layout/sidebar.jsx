import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {
    return (
        <div 
            className="relative px-4 py-8 min-w-3xs flex flex-col bg-[rgba(255,255,255,0.4)] justify-self-start h-full"
        >
            <nav className='absolute bottom-4 max-w-3xs'>
                
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