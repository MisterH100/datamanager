import { Routes, Route} from 'react-router-dom';
import Header from "./components/header";
import ContactEmails from "./pages/emails";
import Email from './pages/email';
import Blog from './pages/blog';
import { useGlobalContext } from './utils/globalContext';
import { Login } from './components/login';
import Home from './pages/home';


function App() {
  const {localUser,isAuthenticated} = useGlobalContext();
  const isAdmin = localUser.admin;
  

  return (
    <main className="w-full bg-base-100 min-h-screen relative min-w-[300px]">
      <Header/>
      {isAuthenticated?
        <>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='emails' element={isAdmin? <ContactEmails />: <Blog/>} />
            <Route path='emails/:emailId' element={isAdmin? <Email />: null} />
            <Route path='publish' element={<Blog/>} />
          </Routes>

        </>:
        <>
          <Routes>
            <Route path='/' element={ <Login/>}/>
          </Routes>
        </>
      }
    </main>

  )
}

export default App


