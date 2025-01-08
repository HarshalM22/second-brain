import { ReactElement } from "react"

interface ButtonProps{
   variant : "primary" | "secondary" 
   text : string 
   startIcon : ReactElement
}

const varientClasses = {
    "primary" : " bg-primary text-white",
    "secondary" : " bg-secondary text-black ",
}

const defaultStyles = "px-4 py-2 rounded-md font-normal text-lg flex items-center gap-2";
export function Button({variant,text,startIcon}: ButtonProps){

    return <button className={varientClasses[variant] + " "+ defaultStyles} >{startIcon}{text}</button>
}