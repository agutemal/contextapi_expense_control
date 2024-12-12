import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import App from './App.tsx'
import { BudgetProvider } from './context/budgetContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BudgetProvider>
      <App/>
    </BudgetProvider>
  </StrictMode>,
)