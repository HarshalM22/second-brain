import axios from "axios";
import { useEffect } from "react";
import { Card } from "./Card";
import { Contentcard } from "./Contentcard";
export function D_body(){

    useEffect(()=>{
        const find = async()=>{
            await axios.get("http://localhost:3001/me",{
                headers :{
                    token : localStorage.getItem('token')
                }
            })

            return(
                <div className="bg-slate-600 rounded-lg h-screen w-screen flex space-x-3 ">
                <Card/>
                <Contentcard title={"hello"} description ={"hellow"} link={"h"}/>            
            </div>
            )
        }
    },[])
    return(
        <div className="bg-slate-600 rounded-lg h-screen w-screen flex space-x-3 ">
            <Card/>
            <Contentcard title={"hello"} description ={"hellow"} link={"h"}/>            
        </div>
    )
}