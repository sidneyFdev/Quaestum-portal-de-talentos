import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {


    return (
        <div 
            className="relative px-4 py-8 w-full flex flex-col bg-(--card-background-color) justify-self-start h-full z-10"
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