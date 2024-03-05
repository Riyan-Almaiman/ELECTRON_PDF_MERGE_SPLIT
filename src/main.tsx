import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SelectionProvider } from './context/SelectionContext.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <SelectionProvider>

    <App />
    </SelectionProvider>

  </React.StrictMode>,
)

// Remove Preload scripts loading
postMessage({ payload: 'removeLoading' }, '*')

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
