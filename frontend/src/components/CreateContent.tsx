import { useRef, useState } from "react";
 import { Cross } from "../icons/Cross";
 import { TwitterIcon } from "../icons/TwitterIcon";
 import { Youtube } from "../icons/Youtube";
 import { Button } from "./Button";
 import { Inputbox } from "./Inputbox";
 import axios from "axios";
 import { BACKEND_URL } from "../../config";
 
 interface props {
     open : boolean
     onClose : ()=>void 
     Update : ()=> void 
 }
 export function CreateContent({open ,onClose,Update } : props){
     const titleref = useRef()
     const linkref = useRef()
 
     const [type ,setType] = useState('youtube')
 
     async function createPost (){
         try{
         await axios.post(`${BACKEND_URL}/api/v1/second-brain/create-post`,{
                 title : titleref.current?.value ,
                 link :  linkref.current?.value ,
                 type : type 
             },{
             headers:{
                 token : localStorage.getItem('token')
             }}
         )
         onClose()
         Update()
     
     }catch(e){
         console.log(e);
         
     }
     }
    
     return (
         <div>
             {open && <div className="w-dvw h-dvh flex justify-center items-center fixed top-o left-0 bg-gray ">
                 <div className="bg-white rounded-lg p-4 flex flex-col items-center gap-6">
                    <div className="flex gap-6 font-bold items-center" >
                         <div>
                             Create Post
                         </div>
                         <div onClick={onClose} className="cursor-pointer">     
                             {<Cross/>}
                         </div>
                         
                    </div>
                   <Inputbox label="Title" type="text" placeholder="title here..." referance={titleref}  />
                   <Inputbox label="link" type="link" placeholder="link here..."  referance={linkref}/>
                   <div className="flex gap-2">
                     <Button text="Youtube" variant="secondary" startIcon={<Youtube/>}  onClick={()=>setType('youtube')}/>
                     <Button text="Twitter" variant="secondary" startIcon={<TwitterIcon/>} onClick={()=>setType('twitter')}/>
                   </div>
                   <Button text="submit" variant="primary" onClick={createPost} />
 
                 </div>
             </div> }
         </div>
     )
 }