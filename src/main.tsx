import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home/Home.tsx'
import './index.scss'
import { NotificationProvider } from './providers/NotificationProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <NotificationProvider>
            <Home />
        </NotificationProvider>
    </React.StrictMode>,
)
