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

    const [data,setData] = useState([])

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await axios.get("http://localhost:3001/me",{
                    headers :{
                        token : localStorage.getItem('token')
                    }
                })
                setData(response.data.find)
                }
                catch(e){
                    console.log(e);
                }
            }
            fetchData()

            
        },[])

        return(
            <div className="flex ">
            <Card/>
            <div className="flex mx-8">
                {data.map((element : Props)=>{
                    return(
                  <Contentcard key={element.link} title={element.title} description={element.description} link={element.link} />
                    )
                })}
            </div>
            </div>
        )

}