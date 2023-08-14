import { Routes, Route } from 'react-router-dom';
import Header from "./components/header";
import Home from "./components/home";
import ContactEmails from "./pages/contact_emails";
import Email from './pages/email';


function App() {

  return (
    <main className="bg-[#3F3E42] h-screen relative">
      <Header />
      <Home />
      <Routes>
        <Route path='/' element={<ContactEmails />}/>
        <Route path='contact-emails' element={<ContactEmails />} />
        <Route path='contact-emails/:emailId' element={<Email/>} />
      </Routes>
    </main>

  )
}

export default App
