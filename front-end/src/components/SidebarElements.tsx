import { ReactElement } from "react"

interface SideElement {
    text: string
    StartIcon: ReactElement
}
export function SidebarElements({ text,StartIcon }: SideElement) {


    return (
        <div className="flex font-serif text-xl font-medium items-center gap-2 mt-10 cursor-pointer">
            {StartIcon}
            {text}
        </div>
    )
}