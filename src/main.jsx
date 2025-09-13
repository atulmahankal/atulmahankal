import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx'
import './main.css'


// Restore original path if redirected from 404.html
function restorePath() {
  const params = new URLSearchParams(window.location.search);
  const p = params.get("p");
  if (p) {
    const newUrl = window.location.origin + "/atulmahankal" + p;
    window.history.replaceState(null, "", newUrl);
  }
}

restorePath();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
