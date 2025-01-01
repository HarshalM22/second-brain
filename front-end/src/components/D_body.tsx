import axios from "axios";
import { useEffect, useState } from "react";

import { Contentcard } from "./Contentcard";
import { Card } from "./Card";

interface Props {
    title : string , 
    description : string , 
    link : string
}
export function D_body(){

 const [data,setData] = useState([]) ;
 const [shouldUpdate,setShouldUpdate] = useState(true);

    useEffect(()=>{
        if(shouldUpdate){
         async function fetchData(){
               
                const response = await axios.get("http://localhost:3001/me",{
                    headers :{
                        token : localStorage.getItem('token')
                    }
                })

                setData(response.data.find)
                setShouldUpdate(false);
            }       
            fetchData()
         
            
        }},[shouldUpdate])
       

        return(
            <div className="flex">
            <Card setShouldUpdate={setShouldUpdate}/>
            <div className=" flex ">
                {data.map((element : Props)=>{
                    return(
                        <div >
                  <Contentcard key={element.link} title={element.title} description={element.description} link={element.link} />
                       </div>
                        )
                })}
                
            </div>
            </div>
        )

}