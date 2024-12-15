import { Login } from "./Login";
import { Navbar } from "./Navbar";

export function Body (){
    return (
    
        <div className="bg-bannerImg bg-no-repeat bg-cover h-screen w-screen">
        <Navbar/>
        <Login/>

        </div>
    )
}