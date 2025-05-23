// import { Button } from "./Button";
 
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Inputbox } from "../components/Inputbox";
// import { BACKEND_URL } from "../../config";
const BACKEND_URL = process.env.BACKEND_URL
console.log(BACKEND_URL);


export function Signuppage(){

    const usernameref = useRef<HTMLInputElement>(null)
    
    const emailref = useRef<HTMLInputElement>(null)
    const passwordref = useRef<HTMLInputElement>(null)
    console.log(usernameref.current?.value);
    
    
    const navigate = useNavigate();
    
    return(
            <div className="bg-secondary font-sans h-screen w-screen flex justify-center items-center">
                <div className=" bg-white border rounded-xl h-auto w-auto p-10 flex flex-col items-center justify-evenly space-y-6">
                   <div className="flex flex-col ">
                    <Inputbox type="text" placeholder="username..." label="Username" referance={usernameref}/>
                   </div>
                   <div className="flex flex-col ">
                    <Inputbox type="email" placeholder="email..." label="Email" referance={emailref}/>
                   </div>
                   <div className="flex flex-col ">
                    <Inputbox type="password" placeholder="password..." label="Password" referance={passwordref}/>
                   </div>
                   <button className="bg-secondary px-6 py-2 rounded-xl" onClick={async()=>{
                   const res = await axios.post(`${BACKEND_URL}/api/v1/second-brain/sign-up`,{
                       
                        username: usernameref.current?.value ,
                        
                        password : passwordref.current?.value,
                        
                        email: emailref.current?.value
                    })
                    console.log(res.data);
                    
                    
                    if(res.status=== 200){
                        navigate("/login")
                    }
                   
                   }}> Sign up </button>
                   <p>already have an account ?<Link className="underline underline-offset-4" to='/login'>login</Link></p>
               </div>
            </div>
    )
}