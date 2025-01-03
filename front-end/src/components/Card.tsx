import {  useState } from "react";
import axios from "axios";
import {BACKEND_URL} from "../../config";
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
        <div className="bg-slate-200 w-56 h-80 border-4 rounded-2xl  flex flex-col items-center ">
            <div className="h-2/4 flex items-center "> image </div>
            <div className=" h-2/4 flex flex-col items-center justify-evenly">
                <input
                    type="text"
                    placeholder="Title"
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                ></input>
                <input
                    type="text"
                    placeholder="Description"
                    onChange={(e) => {
                        setDesc(e.target.value);
                    }}
                ></input>
                <input
                    type="url"
                    placeholder="link"
                    onChange={(e) => {
                        setLink(e.target.value);
                    }}
                ></input>
                <button onClick={createContent}>Create </button>
            </div>
        </div>
    );
}
