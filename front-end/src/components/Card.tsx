import { Share } from "../icons/Share";


interface CardProps{
    title : string
    type : "youtube" | "twitter" | string
    link :string 
}
export function Card({title,type,link}:CardProps){

    return(
    <div className="h-auto ml-8 mt-8 p-4 max-w-80 bg-white rounded-md shadow-md border-slate-200 border">
        <div className="flex justify-between ">
        <div className="w-4/5 flex justify-center">{title}</div>
        <div className="w-1/5 flex justify-end"><Share/></div>
        </div>   


        <div>
            {type === "youtube" && <iframe className="w-full rounded-lg pt-5" src={link.replace("watch","embed")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>}

            {type === "twitter" && <blockquote className="twitter-tweet"><a href={link.replace("x.com","twitter.com")}></a></blockquote>}
        </div> 
    </div>
    )
}

// https://www.youtube.com/watch?v=95oVEx87pVc

// https://www.youtube.com/embed/95oVEx87pVc?si=L62IgUT61KkMxehX