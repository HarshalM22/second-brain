


import { Link } from "react-router-dom"


export function Navbar(){
    

    return(
    <div className="font-asap w-full bg-transparent backdrop-blur-md flex">
        <div className="w-1/3 text-neutral-950 flex px-8 justify-start items-center">
         <a> <b>SECOND BRAIN</b></a>
        </div>

        
        <div className="  w-2/3 text-fuchsia-900 p-3 flex justify-evenly items-center font-semibold">
        
           <Link to="/">Home</Link>            
           <Link to="/">Blogs</Link>            
           <Link to="/">Services</Link>            
           <Link to="/">Contact Us</Link> 
           <Link to="/signup"> Get Started </Link>
        </div>
        

    </div>
    )
}