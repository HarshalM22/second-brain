import {  useState } from "react";
import axios from "axios";
import {BACKEND_URL} from "../../config";
import { Inputbox } from "./Inputbox";
interface Cardprops {
    setShouldUpdate: (value: boolean) => void;
}


export function Card({setShouldUpdate}: Cardprops){
    const [title, setTitle] = useState("");
    const [description, setDesc] = useState("");
    const [link, setLink] = useState("");
  

    async function createContent() {
        try {
            await axios.post(`${BACKEND_URL}/second-brain/create-post`, {
                title,
                description,
                link,
            },
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
            );
            setShouldUpdate(true);
        
        } catch (error) {
            console.error("login failed", error);
        }
    }

    return (
        <div className="bg-slate-200 w-56 h-80 border-2 rounded-2xl  flex flex-col items-center ">
            <div className="h-1/3 flex items-center "> Image </div>
            <div className=" h-2/3 flex flex-col items-center justify-evenly">
                <Inputbox type="text" placeholder=" Title"  onChange={setTitle} />
                <Inputbox type="text" placeholder=" Description"  onChange={setDesc} />
                <Inputbox type="text" placeholder=" Link"  onChange={setLink} />
                <button onClick={createContent} className="text-black bg-secondary rounded-md px-5 py-1 hover:bg-white ease-in duration-200 ">Create </button>
            </div>
        </div>
    );
}
