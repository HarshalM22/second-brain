import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Sidebar } from "../components/Sidebar";
import { Plus } from "../icons/plus";
import { Share } from "../icons/Share";
// import { SidebarElements } from "../components/SidebarElements";


export function Dashboard() {
 
 return (  
    <div className="flex"> 
        <Sidebar/>
        <div className="h-dvh bg-slate-100 flex-grow bg-slate-200">
            <div className="h-24 bg-slate-200 flex">
                <div className="w-2/4 font-sans font-extrabold from-neutral-900 text-2xl pl-16 pt-12"> ALL NOTES </div>
                <div className="w-2/4 pl-16 pt-12 flex gap-9 justify-center">
                <Button variant="secondary" text="Share brain" startIcon={<Share/>} />
                <Button  variant="primary" text="Add content" startIcon={<Plus/>}/>
                </div>
            </div>
            <div className="flex flex-wrap gap-8 flex-grow">
                <Card title="youtube video" type="youtube" link="https://www.youtube.com/embed/0HyIda5eub8?si=CRlLTKPYD7jG2Ydv" />
                <Card title="first tweet" type="twitter" link="https://x.com/VanshBaghel07/status/1876920106812375447" />
                
            </div>
        </div>     
                 
    </div>
      
    )
}