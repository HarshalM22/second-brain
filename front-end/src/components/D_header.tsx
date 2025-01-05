import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../config";
import { Profile } from "./Profile";
export function D_header() {
    const [id, setId] = useState();
    const [profile, setProfile] = useState(false);

    useEffect(() => {
        async function data() {
            const response = await axios.get(`${BACKEND_URL}/me`, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })

            if (response) {
                setId(response.data.userId)
            }
        }
        data()
    }, [id])


    return (
        <div className=" w-full h-16 bg-secondary stroke-black drop-shadow-lg text-white flex justify-between" >
            <span className="mx-16 my-4 cursor-pointer text-black font-semibold flex items-center justify-center">
               Second Brain
            </span>
            <div className="w-60 flex justify-center items-center " onClick = {()=>setProfile(!profile)}>{id}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 cursor-pointer">
                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
            </svg>
             {profile ? <Profile/> : null}
            </div>
           
           
        </div>
    )
}