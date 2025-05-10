import { ReactElement } from "react";

interface SideElement {
  text: string;
  StartIcon: ReactElement;
  active?: boolean;
  onClick?: () => void;
}

export function SidebarElements({ text, StartIcon, active, onClick }: SideElement) {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-3 font-serif text-xl font-medium cursor-pointer px-5 py-2 rounded-lg transition
        w-full
        ${active
          ? "bg-white text-black shadow font-bold"
          : "text-black hover:shadow-md"}
      `}
      style={{
        minHeight: "48px",
        boxSizing: "border-box"
      }}
    >
      {StartIcon}
      <span className="truncate">{text}</span>
    </div>
  );
}
