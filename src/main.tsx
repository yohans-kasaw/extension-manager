import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const rootEl = document.getElementById('root')

if (!rootEl) {
    throw new Error('Failed to find the root element with ID "root".')
}

createRoot(rootEl).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
