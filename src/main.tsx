import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
// app태그만 남개해서 한번만 나오게 처리햇음
    <App />

)
