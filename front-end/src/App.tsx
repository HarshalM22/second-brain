import { Landingpage } from './pages/Landingpage';
import { Dashboard } from './pages/Dashboard';
// import { Navbar } from './components/Navbar';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import { Signuppage } from './pages/Signuppage';
import { Loginpage } from './pages/Loginpage';

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


