import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { BookmarkProvider } from './context/BookmarkContext'
import { AuthProvider } from './context/AuthContext' // ADDED THIS IMPORT
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider> {/* ADDED WRAPPER */}
        <BookmarkProvider>
          <App />
        </BookmarkProvider>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>,
)