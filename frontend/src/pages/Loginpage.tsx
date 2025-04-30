import { useRef } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Inputbox } from "../components/Inputbox";
import { BACKEND_URL } from "../../config";
export function Loginpage() {
    const navigate = useNavigate();
    const usernameref = useRef();
    const emailref = useRef();
    const passwordref = useRef();


    return (
        <div className="bg-secondary font-sans h-screen w-screen flex justify-center items-center">
            <div className=" bg-white border rounded-xl h-80 w-80 flex flex-col items-center justify-evenly">
                <div className="flex flex-col ">
                    <Inputbox type="text" placeholder="username..." label="Username" referance={usernameref}/>
                </div>
                <div className="flex flex-col ">
                    <Inputbox type="email" placeholder="email..." label="Email" referance={emailref}/>
                </div>
                <div className="flex flex-col ">
                    <Inputbox type="password" placeholder="password..." label="Password" referance={passwordref} />
                </div>
                <button className="bg-secondary px-6 py-3 rounded-xl text-white font-bold" onClick={
                    async () => {
                        
                            const response = await axios.post(`${BACKEND_URL}/api/v1/second-brain/login`, {
                                username : usernameref.current?.value,
                                email: emailref.current?.value,
                                password : passwordref.current?.value
                            })
                            if(response.status===200){
                            const token = response.data.token;
                            localStorage.setItem('token', token);
                            navigate('/dashboard')
                            }
                    }
                }>login</button>
            </div>
        </div>
    )
}