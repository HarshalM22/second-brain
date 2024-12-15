// import { Button } from "./Button";

export function Navbar(){

    return(
    <div className="w-full bg-transparent backdrop-blur-md flex">
        <div className="w-1/3 text-neutral-950 flex px-8 justify-start items-center">
         <a> <b>SECOND BRAIN</b></a>
        </div>

        <div className=" w-2/3 text-fuchsia-900 p-3 flex justify-evenly items-center font-semibold">
           <a href="/">Home</a>            
           <a href="/">Blogs</a>            
           <a href="/">Services</a>            
           <a href="/">Contact Us</a> 
           {/* <Button title="Get Started"/>     */}
           <button > Get Started </button>
        </div>

    </div>
    )
}