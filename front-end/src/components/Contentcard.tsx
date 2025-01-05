interface props {
    title : string , 
    description : string , 
    link : string
}

export function Contentcard(props : props){
    

    return(
        <div className=" bg-white w-56 h-80 flex flex-col items-center justify-center rounded-2xl border-x-2">
            <div className="h-1/3 w-2/4 rounded-2xl flex items-center justify-center bg-beige mt-2">  Image Url </div> 
            <div className=" h-2/3 flex flex-col items-center justify-evenly"> 
            <p>{props.title}</p>
            <p>{props.description}</p>
            <p>{props.link}</p>
            </div>
        </div>
    )
}