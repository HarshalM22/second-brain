import {  useState } from "react";
import axios from "axios";

// interface setShouldUpdate {
//     false : boolean
// }

export function Card({setShouldUpdate }) {
    const [title, setTitle] = useState("");
    const [description, setDesc] = useState("");
    const [link, setLink] = useState("");
  

    async function createContent() {
        try {
            await axios.post("http://localhost:3001/second-brain/create-post", {
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
        <div className="bg-slate-200 w-56 h-80 flex flex-col items-center ">
            <div className="h-2/4 flex items-center"> image </div>
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
