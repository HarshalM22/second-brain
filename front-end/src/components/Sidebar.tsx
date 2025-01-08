import { Example } from "../icons/Example";
import { SidebarElements } from "./SidebarElements";

export function Sidebar ( ){


    return (
        <div className=" h-dvh w-80 text-beige flex-col ">
        <div className="h-20 font-extrabold flex justify-center items-center from-neutral-900 text-3xl"> Second Brain</div>
        <div className="pl-20">
           <SidebarElements text="Tweets"  StartIcon={<Example/>}/>
           <SidebarElements text="Videos" StartIcon={<Example/>}/>
           <SidebarElements text="Documents" StartIcon={<Example/>}/>
           <SidebarElements text="Tags" StartIcon={<Example/>}/>
           <SidebarElements text="Links" StartIcon={<Example/>}/>
        </div>
    </div>
    )
}