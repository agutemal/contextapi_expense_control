import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import { useEffect, useMemo } from "react"
import BudgetTraker from "./components/budgetTrckert"
import ExpenseModal from "./components/expenseModal"
import ExpenseList from "./components/expenseList"
import FilterbyCategory from "./components/filterbyCategory"

function App() {
  const {state,dispatch} =  useBudget()
  const isValidBudget=useMemo(()=>state.budget>0,[state.budget])
  
  
  useEffect(()=>{
    localStorage.setItem('budget',state.budget.toString())
    localStorage.setItem('expenses',JSON.stringify(state.expenses))
  },[state])

  return (
    <>
    <header className="bg-blue-600 py-8 max-h-72">
      <h1 className="uppercase text-center font-black text-4xl text-white">Planificador de gastos</h1>
    </header>
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
      <p>Formulario</p>
      {isValidBudget? <BudgetTraker/>:<BudgetForm/>}
    </div>
    {isValidBudget&& (
      <main className="max-w-3xl mx-auto py-10">
        <ExpenseModal/>
        <FilterbyCategory/>
        <ExpenseList/>
      </main>
    )}
      
    </>
  )
}

export default App
