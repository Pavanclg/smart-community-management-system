import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./App.css";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <App />

    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#1f2937",
          color: "#fff",
          border: "1px solid #22c55e"
        }
      }}
    />

  </StrictMode>,
);