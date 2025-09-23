import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import axios from "axios";
const promise = axios.get("http://localhost:3001/selling_point");
promise.then((response) => {
  console.log(promise);
  console.log(response);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
