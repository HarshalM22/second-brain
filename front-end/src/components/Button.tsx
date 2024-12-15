
interface props {
    title : string | number 
}
export async function Button(props : props  ){
    
//    const user = fetch("")
  
   


    return(
            <button className="border-zinc-950 bg-[#64ec91] p-1 px-4 b rounded-lg text-[#5b1168]" >{props.title}</button>
    )
}