import React from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = ({ activeSideBar, toggleActiveSideBar }) => {
    
    return (
        <header
            className={`w-full border-b-1 border-(--active-action-button-color) p-2 flex justify-between bg-(--action-button-color) text-gray-700 ${activeSideBar && "text-gray-900"}`}
        >
            <div>
                <button onClick={toggleActiveSideBar} className='px-2 py-1 
                border-white cursor-pointer hover:bg-(--active-action-button-color)'>
                    <FontAwesomeIcon icon={faBars} size={'xl'}/>
                </button>
            </div>

            
        </header>
    )
}

export default Header;