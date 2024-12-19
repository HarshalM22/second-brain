// import { Button } from "./Button";

import { useState } from "react";
import { Link } from "react-router-dom";

export function Signuppage(){
    const [username,setUsername] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    
    const createUSer = async()=>{
        const credentials ={username:username,firstName:firstName,lastName:lastName,email:email,password:password};
        try{
            await fetch("http://localhost:3001/second-brain/sign-up",{
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
        
        
            <div className="h-screen w-screen flex justify-center items-center">
                <div className="bg-cyan-400 h-auto w-60 p-6 flex flex-col justify-center items-center space-y-4 text-black">
                   <div><p>Username</p><input type="text" placeholder=" Your Username" value={username} onChange={(e) => setUsername(e.target.value)}/></div>
                   <div><p>First Name</p><input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/></div>
                   <div><p>Last Name</p><input type="text" placeholder=" Last Name " value={lastName} onChange={(e) => setLastName(e.target.value)}/></div>
                   <div><p>email</p><input type="text" placeholder=" email " value={email} onChange={(e) => setEmail(e.target.value)}/></div>
                   <div><p>Password</p><input type="text" placeholder=" Password" value={password} onChange={(e) => setPassword(e.target.value)}/> </div>
                   <Link to="/login"onClick={createUSer}> sign up </Link>
                   <p>already have an account ?<Link to='/login'>login</Link></p>
               </div>
            </div>
    )
}