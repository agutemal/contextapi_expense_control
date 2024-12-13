import { DraftExpense,Expense } from "../types";
import { v4 as uuidv4 } from 'uuid';

export type BudgetActions=
{type:'add-budget',playload:{budget:number}}|
{type:'sho-modal'}|
{type:'close-modal'}|
{type:'add-expense',payload:{expense:DraftExpense}}

export type BudgetState={
    budget:number
    modal:boolean
    expenses:Expense[]
}

export const initialState:BudgetState={
    budget:0,
    modal:false,
    expenses:[]
}

const createExpense=(draftExpense:DraftExpense):Expense=>{
    return{
        ...draftExpense,id:uuidv4()
    }

}

export const budgetReduce=(state:BudgetState=initialState,action:BudgetActions)=>{
    if (action.type==='add-budget') {
        return{...state,budget:action.playload.budget}
    }
    if (action.type==="sho-modal") {
        return{...state, modal:true}
    }
    if (action.type==="close-modal") {
        return{...state, modal:false}
    }
    if (action.type==="add-expense") {
        const expense=createExpense(action.payload.expense)
        return{...state, expenses:[...state.expenses,expense],modal:false}
    }
    return state
}