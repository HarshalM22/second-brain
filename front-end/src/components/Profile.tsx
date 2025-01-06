import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { BACKEND_URL } from "../../config";


export function Profile() {
 
    const [user, setUser] = useState([])
    function logout() {
        localStorage.removeItem('token')
        window.location.href = '/'
    }
    function changePassword() {
        
    }
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`${BACKEND_URL}/userinfo`, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            setUser(response.data.user)
        }
        fetchData()

    }, [])


    return (
        <div className="h-80 w-60 text-black absolute rounded-lg mt-96 bg-secondary flex flex-col items-center justify-evenly">
            <div className="h-1/4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                - {user.username} </div>
            <div className=" h-3/4 flex flex-col items-center justify-evenly">
                <Link to="#"> Dashboard</Link>
                
                
                <button onClick={changePassword}>Change Password</button>
                 
                
                <button onClick={logout} className="flex items-center ">
                    Logout</button>
            </div>
        </div>
    )
}