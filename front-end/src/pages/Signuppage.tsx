// import { Button } from "./Button";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Inputbox } from "../components/Inputbox";
import { BACKEND_URL } from "../../config";
export function Signuppage(){
    const [username,setUsername] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const navigate = useNavigate();
    
   

    return(
            <div className="bg-secondary font-mono h-screen w-screen flex justify-center items-center">
                <div className=" bg-white border-2 rounded-xl h-auto w-80 p-6 flex flex-col items-center justify-evenly space-y-3">
                   <div className="flex flex-col ">
                    <Inputbox type="text" placeholder="username..." label="Username" onChange={setUsername}/>
                   </div>
                   <div className="flex flex-col "> 
                    <Inputbox type="text" placeholder="first Name..." label="First Name" onChange={setFirstName}/>
                   </div>
                   <div className="flex flex-col ">
                    <Inputbox type="text" placeholder="last Name..." label="Last Name" onChange={setLastName}/>
                   </div>
                   <div className="flex flex-col ">
                    <Inputbox type="email" placeholder="email..." label="Email" onChange={setEmail}/>
                   </div>
                   <div className="flex flex-col ">
                    <Inputbox type="password" placeholder="password..." label="Password" onChange={setPassword}/>
                   </div>
                   <button className="bg-secondary px-6 py-2 rounded-xl" onClick={async()=>{
                    await axios.post(`${BACKEND_URL}/api/v1/second-brain/sign-up`,{
                        username,
                        firstName,
                        lastName,
                        password,
                        email
                    });
                    navigate("/login")
                   }}> Sign up </button>
                   <p>already have an account ?<Link className="underline underline-offset-4" to='/login'>login</Link></p>
               </div>
            </div>
    )
}