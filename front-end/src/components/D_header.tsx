import axios from "axios"
import { useEffect, useState } from "react"
export function D_header(){
    const [id,setId] = useState();

    useEffect(()=>{
      async function data (){
     const response = await axios.get("http://localhost:3001/me",{
        headers :{
            token :localStorage.getItem('token')
        }}) 

        if(response){
            setId(response.data.userId)
        }}
     data()
    },[id])
 

    return(
        <div className="bg-black w-full h-16 text-white flex items-center justify-between" >
            <div> menu </div>
            <div >profile = {id}</div>
        </div>
    )
}