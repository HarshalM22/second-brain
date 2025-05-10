import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Brain } from "../icons/Brain";
import { Links } from "../icons/Links";
import { Logout } from "../icons/Logout";
import { TwitterIcon } from "../icons/TwitterIcon";
import { Youtube } from "../icons/Youtube";
import { Globe } from "lucide-react";
import { InstagramIcon } from "../icons/InstagramIcon";
import { Button } from "./Button";
import { SidebarElements } from "./SidebarElements";

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
    { label: "Instagram", icon: <InstagramIcon /> },
    { label: "Links", icon: <Links /> },
  ];

  const handleSectionClick = (label: string) => {
    setActive(label);
    setActiveSection(label);
  };

  return (
    <div className="h-dvh w-72 bg-neutral-950 text-beige flex flex-col  justify-between py-6">
      {/* Header */}
      <div className="h-20 font-bold flex justify-center items-center text-3xl gap-2">
        <Brain />
        <span>Second Brain</span>
      </div>

      {/* Sidebar Items */}
      <div className="flex flex-col gap-2 px-4 flex-1 justify-center items-center">
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
      <div className="px-4 fixed bottom-2 ">
        <Button
          variant="primary"
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
