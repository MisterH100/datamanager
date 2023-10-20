import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GlobalContextProvider } from './utils/globalContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <React.StrictMode>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </React.StrictMode>
  </BrowserRouter>
)
