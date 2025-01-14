import { useRef, useState } from "react"
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
        <div className="bg-secondary font-mono h-screen w-screen flex justify-center items-center">
            <div className=" bg-white border-2 rounded-xl h-80 w-80 flex flex-col items-center justify-evenly">
                <div className="flex flex-col ">
                    <Inputbox type="text" placeholder="username..." label="Username" referance={usernameref}/>
                </div>
                <div className="flex flex-col ">
                    <Inputbox type="email" placeholder="email..." label="Email" referance={emailref}/>
                </div>
                <div className="flex flex-col ">
                    <Inputbox type="password" placeholder="password..." label="Password" referance={passwordref} />
                </div>
                <button className="bg-secondary px-6 py-3 rounded-xl" onClick={
                    async () => {
                        try {
                            const response = await axios.post(`${BACKEND_URL}/api/v1/second-brain/login`, {
                                username : usernameref.current?.value,
                                email: emailref.current?.value,
                                password : passwordref.current?.value
                            })
                            const token = response.data.token;
                            localStorage.setItem('token', token);

                            navigate('/dashboard')


                        } catch (e) {
                            console.log(`error in login ${e}`);
                        }
                    }
                }>login</button>
            </div>
        </div>
    )
}