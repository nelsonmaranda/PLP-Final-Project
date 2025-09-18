import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './screens/App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { registerSW } from './pwa.js'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

registerSW()


