import { Routes, Route } from 'react-router-dom';
import Header from "./components/header";
import Home from "./components/home";
import ContactEmails from "./pages/emails";
import Email from './pages/email';
import Blog from './pages/blog';

function App() {

  return (
    <main className="bg-base-100 min-h-screen relative">
      <Header />
      <Home />
      <Routes>
        <Route path='/' element={<ContactEmails />}/>
        <Route path='emails' element={<ContactEmails />} />
        <Route path='emails/:emailId' element={<Email />} />
        <Route path='publish' element={<Blog/>} />
      </Routes>
    </main>

  )
}

export default App
