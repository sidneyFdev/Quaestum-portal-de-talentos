import React from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = ({ activeSideBar, toggleActiveSideBar }) => {
    
    return (
        <header
            className={`w-full border-(--active-action-button-color)  text-gray-700 ${activeSideBar && "text-gray-900"}`}
        >
            <div>
                <button onClick={toggleActiveSideBar} className='
                cursor-pointer hover:bg-(--active-action-button-color)'>
                    <FontAwesomeIcon icon={faBars} size={'xl'}/>
                </button>
            </div>

            
        </header>
    )
}

export default Header;