import { Cross } from "../icons/Cross";
import { Button } from "./Button";
import { Inputbox } from "./Inputbox";

interface props {
    open : boolean
    onClose : ()=>void 
}
export function CreateContent({open ,onClose } : props){
   
    return (
        <div>
            {open && <div className="w-dvw h-dvh flex justify-center items-center fixed top-o left-0 opacity-60 bg-black ">
                <div className="bg-white rounded-lg p-4 flex flex-col items-center gap-6">
                   <div className="flex gap-6 font-bold items-center" >
                        <div>
                            Create post
                        </div>
                        <div onClick={onClose}>     
                            {<Cross/>}
                        </div>
                        
                   </div>
                  <Inputbox label="Title" type="text" placeholder="title here..."  />
                  <Inputbox label="Type" type="text" placeholder="type here..."  />
                  <Inputbox label="link" type="link" placeholder="link here..."  />
                  <Button text="submit" variant="primary" />

                </div>
            </div> }
        </div>
    )
}