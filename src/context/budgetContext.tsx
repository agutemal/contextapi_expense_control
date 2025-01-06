import { useReducer,createContext, Dispatch, ReactNode,useMemo } from "react"
import { budgetReduce, BudgetState, initialState,BudgetActions } from "../reducers/budgetreduce"

type  BudgetContextProps={
  state: BudgetState
  dispatch:Dispatch<BudgetActions>
  totalExpenses:number
  remainingBudget:number
}

export const BudgetContext=createContext<BudgetContextProps>({} as BudgetContextProps)
type BudgetProviderProps={
  children:ReactNode
}

export const BudgetProvider = ({children}:BudgetProviderProps) => {
  const [state,dispatch]=useReducer(budgetReduce, initialState)


  const totalExpenses=useMemo(()=>state.expenses.reduce((total,expense)=>expense.amount+total,0)
    ,[state.expenses])
    const remainingBudget=state.budget-totalExpenses

  return (
        <BudgetContext.Provider value={{state,dispatch,totalExpenses,remainingBudget}}>
          {children}
        </BudgetContext.Provider>
    )
}

