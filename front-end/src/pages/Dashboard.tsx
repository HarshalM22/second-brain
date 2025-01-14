import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Sidebar } from "../components/Sidebar";
import { Plus } from "../icons/Plus";
import { Share } from "../icons/Share";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { CreateContent } from "../components/CreateContent";
// import { SidebarElements } from "../components/SidebarElements";

interface Props{
    title : string
    link : string 
    type : "twitter" | "youtube"
    id  : number
}

export function Dashboard() {
    const [posts,setPosts] = useState([]);
    const [createPost , setCreatePost ] = useState(false) ;
    const [shouldUpdate,setShouldUpdate] = useState( false);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/second-brain/posts`,{
            headers:{
                token : localStorage.getItem('token')
            }
        }).then(Response=>setPosts(Response.data.posts))
    },[shouldUpdate])
    

    
    
    

 return (  
    <div className="flex"> 
    <CreateContent open ={createPost} onClose={()=>setCreatePost(false)} Update={()=>setShouldUpdate(true)}/> 
        <Sidebar/>
        <div className="h-vh w-dvw bg-slate-100 flex-grow bg-slate-200">
            <div className="h-24 bg-slate-200 flex">
                <div className="w-2/4 font-sans font-extrabold from-neutral-900 text-2xl pl-16 pt-12"> ALL NOTES </div>
                <div className="w-2/4 pl-16 pt-12 flex gap-9 justify-center">
                <Button variant="secondary" text="Share brain" startIcon={<Share/>} />
                <Button  variant="primary" text="Add content" startIcon={<Plus/>} onClick={()=>setCreatePost(true)}/>
                </div>
            </div>
            <div className="flex flex-wrap gap-8 flex-grow ">
                {posts.map((element:Props)=>{
                    return (
                    <Card key={element.id} title={element.title} type={element.type} link={element.link} />
                    )
                })} 
            </div>
        </div>     
                 
    </div>
      
    )
}