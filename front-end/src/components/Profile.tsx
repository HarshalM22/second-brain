import axios from "axios"
import { useState } from "react"

export function Profile(){
const [id , setId] = useState()
const response = ()=>{
    axios.get("http://localhost:3001/me",{
    headers :{
        token :localStorage.getItem('token')
    } 
})}
return(
    <div>
         <p> userId = {Id}</p>
    </div>
)
}