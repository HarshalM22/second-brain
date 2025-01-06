import axios from "axios"
import { BACKEND_URL } from "../../config"

interface props {
    title : string , 
    description : string , 
    link : string
    setShouldUpdate : (value : boolean) => void
}

export function Contentcard( props  : props){
    
    async function deleteContent(){
        try{
            await axios.delete(`${BACKEND_URL}/second-brain/delete-post`,{
                headers : {
                    token : localStorage.getItem("token")
                },
                data: {
                    title : props.title
            }})
            props.setShouldUpdate(true)
        }catch(error){
            console.error("login failed", error);
        }
    }

    return(
        <div className=" bg-white w-56 h-80 flex flex-col items-center justify-center rounded-2xl border-x-2">
            <div className="h-1/3 w-2/4 rounded-2xl flex items-center justify-center bg-beige mt-2">  Image Url </div> 
            <div className=" h-2/3 flex flex-col items-center justify-evenly"> 
            <p>{props.title}</p>
            <p>{props.description}</p>
            <p>{props.link}</p>
            </div>
            <button className="mb-2 bg-secondary rounded-md px-3" onClick={deleteContent}>Delete</button>
        </div>
    )
}