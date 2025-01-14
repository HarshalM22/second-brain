import { Brain } from "../icons/Brain";
import { Docs } from "../icons/Docs";
import { Example } from "../icons/Example";
import { Links } from "../icons/Links";
import { Logout } from "../icons/Logout";
import { Tags } from "../icons/Tags";
import { TwitterIcon } from "../icons/TwitterIcon";
import { Youtube } from "../icons/Youtube";
import { Button } from "./Button";
import { SidebarElements } from "./SidebarElements";

export function Sidebar ( ){


    return (
        <div className=" h-dvh w-80 text-beige flex-col ">
        <div className="h-20 font-extrabold flex justify-center items-center from-neutral-900 text-3xl gap-2">
            <div className="flex items-center">
              {<Brain/>}
            </div>
            <div className=" flex items-center ">
              Second Brain
            </div>
        </div>
        <div className="pl-20">
           <SidebarElements text="Tweets"  StartIcon={<TwitterIcon/>}/>
           <SidebarElements text="Videos" StartIcon={<Youtube/>}/>
           <SidebarElements text="Documents" StartIcon={<Docs/>}/>
           <SidebarElements text="Tags" StartIcon={<Tags/>}/>
           <SidebarElements text="Links" StartIcon={<Links/>}/>
        </div>
        <div>
            <Button variant="secondary" text="Logout" startIcon={<Logout/>} onClick={()=> window.location.assign("/")}/>
        </div>
    </div>
    )
}