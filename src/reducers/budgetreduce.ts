export type BudgetActions={
    type:'add-budget',
    playload:{budget:number}
}

export type BudgetState={
    budget:number
}

export const initialState:BudgetState={
    budget:0
}

export const budgetReduce=(state:BudgetState=initialState,action:BudgetActions)=>{
    if (action.type==='add-budget') {
        return{...state,budget:action.playload.budget}
    }
    return state
}