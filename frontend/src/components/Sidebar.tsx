import { useNavigate } from "react-router-dom";
 import { useState } from "react";
 
 import { Brain } from "../icons/Brain";
 import { Docs } from "../icons/Docs";
 import { Links } from "../icons/Links";
 import { Logout } from "../icons/Logout";
 import { Tags } from "../icons/Tags";
 import { TwitterIcon } from "../icons/TwitterIcon";
 import { Youtube } from "../icons/Youtube";
 import { Button } from "./Button";
 import { SidebarElements } from "./SidebarElements";
 import { Globe } from "lucide-react"; // For "All" icon
 
 interface SidebarProps {
   setActiveSection: (section: string) => void;
 }
 
 export function Sidebar({ setActiveSection }: SidebarProps) {
   const navigate = useNavigate();
   const [active, setActive] = useState("All");
 
   const sections = [
     { label: "All", icon: <Globe /> },
     { label: "Tweets", icon: <TwitterIcon /> },
     { label: "Videos", icon: <Youtube /> },
     { label: "Documents", icon: <Docs /> },
     { label: "Tags", icon: <Tags /> },
     { label: "Links", icon: <Links /> },
   ];
 
   const handleSectionClick = (label: string) => {
     setActive(label);
     setActiveSection(label);
   };
 
   return (
     <div className="h-dvh w-80 bg-neutral-950 text-beige flex flex-col justify-between py-6 shadow-xl">
       {/* Header */}
       <div className="h-20 font-bold flex justify-center items-center text-3xl gap-2 ">
         <Brain />
         <span>Second Brain</span>
       </div>
 
       {/* Sidebar Items */}
       <div className="flex flex-col gap-2 px-10 mt-4">
         {sections.map(({ label, icon }) => (
           <SidebarElements
             key={label}
             text={label}
             StartIcon={icon}
             active={active === label}
             onClick={() => handleSectionClick(label)}
           />
         ))}
       </div>
 
       {/* Logout Button */}
       <div className="px-10">
         <Button
           variant="secondary"
           text="Logout"
           startIcon={<Logout />}
           onClick={() => {
             localStorage.removeItem("token");
             navigate("/");
           }}
         />
       </div>
     </div>
   );
 }