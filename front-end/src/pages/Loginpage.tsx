import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
export function Loginpage(){
    const navigate = useNavigate() ;
    const[username,setUsername] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
   
       
       
    return (
        <div className="h-screen w-screen flex justify-center items-center">
        <div className="h-80 w-80 bg-sky-400 flex flex-col items-center justify-center">
            <p>username</p><input type="text" placeholder="username" onChange={(e)=>{setUsername(e.target.value)}}/> 
            <p>email</p><input type="email" placeholder="email" onChange={(e)=>{setEmail(e.target.value)}}/> 
            <p>password</p><input type="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value)}}/>
            <button onClick={ 
                async()=>{
                    try{
                        const response = await axios.post("http://localhost:3001/second-brain/login",{
                           username,
                           email,
                           password 
                        }) 
                        const token = response.data.token ;
                        localStorage.setItem('token',token);

                        navigate('/dashboard')


                    }catch(e){
                        console.log(`error in login ${e}`);
                    }
                }
            }>login</button> 
        </div>
        </div>
    )
}