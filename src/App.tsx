import { Routes, Route } from 'react-router-dom';
import Header from "./components/header";
import Tabs from "./components/tabs";
import ContactEmails from "./pages/emails";
import Email from './pages/email';
import Blog from './pages/blog';
import { useGlobalContext } from './utils/globalContext';
import { Login } from './components/login';
import Home from './pages/home';


function App() {
  const {isLoggedIn,user} = useGlobalContext();
  const isAdmin = user.admin;
  return (
    <main className="bg-base-100 min-h-screen relative">
      <Header/>
      {isLoggedIn?
        <>
          <Tabs />
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='emails' element={isAdmin? <ContactEmails />: <Blog/>} />
            <Route path='emails/:emailId' element={<Email />} />
            <Route path='publish' element={<Blog/>} />
          </Routes>

        </>:
        <>
          <Login/>
        </>
      }
    </main>

  )
}

export default App
