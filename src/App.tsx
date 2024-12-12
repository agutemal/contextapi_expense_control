import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import { useMemo } from "react"
import BudgetTraker from "./components/budgetTrckert"
function App() {
  const {state,dispatch} =  useBudget()
  const isValidBudget=useMemo(()=>state.budget>0,[state.budget])
  
  return (
    <>
    <header className="bg-blue-600 py-8 max-h-72">
      <h1 className="uppercase text-center font-black text-4xl text-white">Planificador de gastos</h1>
    </header>
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
      <p>Formulario</p>
      {isValidBudget? <BudgetTraker/>:<BudgetForm/>}
    </div>
    </>
  )
}

export default App
