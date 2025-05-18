import axios from "axios"
import React, { useEffect, useState } from "react"

const Home = () => {

    const [token, setToken] = useState(null)

    useEffect(()=>{
        let localToken = localStorage.getItem('token')

        setToken(localToken)
    },[])

    const requestAxios = async () => {

    const response = await axios.post(
        `${import.meta.env.VITE_API_URL}user/detail`, 
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
            
    }

    return (
        <div className="default-page-container">
            Candidate home
            <button
                type="button"
                onClick={()=>requestAxios()}
            >
                button
            </button>
        </div>
    )
}

export default Home