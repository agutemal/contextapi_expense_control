import { useReducer,createContext, Dispatch, ReactNode } from "react"
import { budgetReduce, BudgetState, initialState,BudgetActions } from "../reducers/budgetreduce"

type  BudgetContextProps={
  state: BudgetState
  dispatch:Dispatch<BudgetActions>
}

export const BudgetContext=createContext<BudgetContextProps>({} as BudgetContextProps)
type BudgetProviderProps={
  children:ReactNode
}

export const BudgetProvider = ({children}:BudgetProviderProps) => {
  const [state,dispatch]=useReducer(budgetReduce, initialState)

  return (
        <BudgetContext.Provider value={{state,dispatch}}>
          {children}
        </BudgetContext.Provider>
    )
}

