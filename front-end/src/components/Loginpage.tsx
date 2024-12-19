import { useState } from "react"
import { Link } from "react-router-dom";

export function Loginpage(){
    const[username,setUsername] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const loginUser = async()=>{
     try{
        const loginCredentials = {username : username,email:email,password:password} ;

        await fetch("http://localhost:3001/second-brain/login",{
            method : "POST",
            headers :{ "content-type" : "application/json"},
            body : JSON.stringify(loginCredentials) 

        })
     }
     catch(e){
        console.log(e);
        
     }
    }
    return (
        <div className="h-screen w-screen flex justify-center items-center">
        <div className="h-80 w-80 bg-sky-400 flex flex-col items-center justify-center">
            <p>username</p><input type="text" placeholder="username" onChange={(e)=>{setUsername(e.target.value)}}/> 
            <p>email</p><input type="email" placeholder="email" onChange={(e)=>{setEmail(e.target.value)}}/> 
            <p>password</p><input type="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value)}}/>
            <Link to="/dashboard" onClick={loginUser}>login</Link> 
        </div>
        </div>
    )
}