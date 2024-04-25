import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter } from 'react-router-dom'
import DotBackground from './components/ui/DotBackground.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <DotBackground>
        <App />
      </DotBackground>
    </BrowserRouter>
  </React.StrictMode>,
)
