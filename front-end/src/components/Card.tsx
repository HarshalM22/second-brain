import { useState } from "react"

export function Card(){
     const [title , setTitle] = useState("") ;
     const [description , setDesc] = useState("") ;
     const [link , setLink] = useState("") ;
     
     
     const createContent = async ()=>{
        const content = {title:title ,description:description , link:link};
        try{
            await fetch("http://localhost:3001/second-brain/create-post",{
                method : 'POST',
                headers :{ 'Content-Type' : 'application/json'},
                body : JSON.stringify(content) 
            })
        }
        catch(error){
            console.error("login failed",error);
        }
}
     
    return(
        <div className="bg-slate-200 w-56 h-80 flex flex-col items-center ">
            <div className="h-2/4 flex items-center">  image </div> 
            <div className=" h-2/4 flex flex-col items-center justify-evenly"> 
            <input type="text" placeholder="Title" onChange={(e)=>{setTitle(e.target.value)}}></input>
            <input type="text" placeholder="Description" onChange={(e)=>{setDesc(e.target.value )}} ></input>
            <input type="url" placeholder="link" onChange={(e)=>{setLink(e.target.value)}} ></input>
            <button onClick={createContent}>Create </button>
            </div>
        </div>
    )
}



