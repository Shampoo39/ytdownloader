import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// TypeScript doesn't have declaration for importing CSS as a side-effect in this project.
// Ignore the missing module/type declarations for this import.
// @ts-ignore
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
