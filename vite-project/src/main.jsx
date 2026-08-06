import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'sonner'
import SkeletonTheme from 'react-loading-skeleton';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <SkeletonTheme baseColor="#202020" highlightColor="#444"> */}
      <Toaster />
      <App />
    {/* </SkeletonTheme> */}
  </StrictMode>
  ,
)
