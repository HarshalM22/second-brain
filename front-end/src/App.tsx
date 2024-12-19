import { Landingpage } from './components/Landingpage';
import { Dashboard } from './components/Dashboard';
// import { Navbar } from './components/Navbar';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import { Signuppage } from './components/Signuppage';
import { Loginpage } from './components/Loginpage';

export default function App(){
 

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Landingpage/>}/>
          <Route path='/dashboard' element = {<Dashboard/>}/>
          <Route path='/signup' element = {<Signuppage/>} />
          <Route path='/login' element = {<Loginpage/>} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}


