import { Routes, Route} from 'react-router-dom';
import Header from "./components/header";
import ContactEmails from "./pages/emails";
import Email from './pages/email';
import Blog from './pages/blog';
import { useGlobalContext } from './utils/globalContext';
import { Login } from './components/login';
import Home from './pages/home';


function App() {
  const {user,isAuthenticated} = useGlobalContext();

  return (
    <main className="w-full bg-base-100 min-h-screen relative min-w-[300px]">
      <Header/>
        <Routes>
          <Route 
            path='/' 
            element={isAuthenticated? <Home/>: <Login/>} 
          />
          <Route 
            path='emails' 
            element={isAuthenticated? user.admin? <ContactEmails />: <Blog/>: <Login/>} 
          />
          <Route 
            path='emails/:emailId' 
            element={isAuthenticated? user.admin? <Email />: null: <Login/>} 
          />
          <Route 
            path='publish' 
            element={isAuthenticated? user.admin?<Blog/>: null: <Login/>} 
          />
        </Routes>
    </main>

  )
}

export default App


