// import { Button } from "./Button";

import { useState } from "react";

export function Login(){
    const [username,setUsername] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    
    const handleLogin = async()=>{
        const credentials ={username:username,firstName:firstName,lastName:lastName,email:email,password:password};
        try{
            await fetch("http://localhost:3000/second-brain/sign-up",{
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json', // Inform server data type
                  },
                body : JSON.stringify(credentials)

            })
            
        }
        catch(error){
           console.error("login failed",error);
        }
    }

    return(
        <div className="bg-red-700 h-80 w-60 p-6 flex flex-col justify-center items-center space-y-4">
            <div><p>Username</p><input type="text" placeholder=" Your Username" value={username} onChange={(e) => setUsername(e.target.value)}/></div>
            <div><p>First Name</p><input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/></div>
            <div><p>Last Name</p><input type="text" placeholder=" Last Name " value={lastName} onChange={(e) => setLastName(e.target.value)}/></div>
            <div><p>email</p><input type="text" placeholder=" email " value={email} onChange={(e) => setEmail(e.target.value)}/></div>
            <div><p>Password</p><input type="text" placeholder=" Password" value={password} onChange={(e) => setPassword(e.target.value)}/> </div>

            <button onClick={handleLogin}> sign up </button>
        </div>
    )
}