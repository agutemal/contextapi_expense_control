import { Category, DraftExpense,Expense } from "../types";
import { v4 as uuidv4 } from 'uuid';

export type BudgetActions=
{type:'add-budget',playload:{budget:number}}|
{type:'sho-modal'}|
{type:'close-modal'}|
{type:'add-expense',payload:{expense:DraftExpense}}|
{type:'remove-expense',payload:{id:Expense['id']}}|
{type:'get-expense-by-id',payload:{id:Expense['id']}}|
{type:'update-expense',payload:{expense:Expense}}|
{type:'reset-app'}|
{type:'add-filter-category',payload:{id:Category['id']}}

export type BudgetState={
    budget:number
    modal:boolean
    expenses:Expense[]
    editingId:Expense['id']
    currentCategory: Category['id']
}

const initialBugget=(): number =>{
    const localStorageBugget=localStorage.getItem('budget')
    return localStorageBugget? Number(localStorageBugget):0;
}

const localStorageExpenses=(): Expense[] =>{
    const localStorageExpense=localStorage.getItem('expenses')
    return localStorageExpense? JSON.parse(localStorageExpense):[];
}



export const initialState:BudgetState={
    budget:initialBugget(),
    modal:false,
    expenses:localStorageExpenses(),
    editingId:'',
    currentCategory:''
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
        return{...state, modal:false,editingId:''}
    }
    if (action.type==="add-expense") {
        const expense=createExpense(action.payload.expense)
        return{...state, expenses:[...state.expenses,expense],modal:false}
    }
    if (action.type==="remove-expense") {
        return{...state, expenses:state.expenses.filter(expense=>expense.id!==action.payload.id)}
    }
    if (action.type==="get-expense-by-id") {
        return{...state, editingId:action.payload.id,modal:true}
    }
    if (action.type==="update-expense") {
        return{
            ...state, 
            expenses:state.expenses.map(expense=>expense.id===action.payload.expense.id?action.payload.expense:expense),
            modal:false,
            editingId:''
        }
    }
    if (action.type==="reset-app") {
        return{
            ...state,
            budget:0,
            expenses:[],
        }
    }
    if (action.type=='add-filter-category') {
        return{...state,currentCategory:action.payload.id}
        
    }
    return state
}