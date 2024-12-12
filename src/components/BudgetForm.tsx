import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget";

const BudgetForm = () => {

  const [budget, setBudget]=useState<number>(0);
  const {state,dispatch} = useBudget()
  const handleGetBudget=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setBudget(e.target.valueAsNumber);
  }

  const budgetIsValid:boolean=useMemo(():boolean=>{
    return isNaN(budget)|| budget<=0;
  },[budget])

  const handleSubmit=(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    dispatch({type:'add-budget',playload:{budget}})
    
  }
  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5">
          <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">Definir Presupuesto</label>
          <input id="budget" type="number" className="w-full bg-white border border-gray-200 p-2" name="budget" 
          onChange={handleGetBudget} value={budget}
          />
        </div>
        <input type="submit" value="definir presupuesto" 
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40" disabled={budgetIsValid}/>
    </form>
  )
}

export default BudgetForm