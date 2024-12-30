interface props {
    title : string , 
    description : string , 
    link : string
}

export function Contentcard(props : props){
    

    return(
        <div className="bg-slate-200 w-56 h-80 flex flex-col items-center ">
            <div className="h-2/4 flex items-center">  image </div> 
            <div className=" h-2/4 flex flex-col items-center justify-evenly"> 
            <p>{props.title}</p>
            <p>{props.description}</p>
            <p>{props.link}</p>
            </div>
        </div>
    )
}