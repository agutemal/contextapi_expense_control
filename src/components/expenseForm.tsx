
import { categories } from '../data/categories'
import { useEffect, useState } from 'react'
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { DraftExpense, Value } from '../types';
import ErrorMessaje from './errorMessaje';
import { useBudget } from '../hooks/useBudget';

const ExpenseForm = () => {
    const [expense,setExpense]=useState<DraftExpense>({
        amount:0,
        expenseName:"",
        category:"",
        date:new Date()
    })

    const [error, setError]=useState<String>("");
    const {dispatch,state,remainingBudget}=useBudget();
    const [previousAmount,setPreviousAmount]=useState(0)

    useEffect(()=>{
        if (state.editingId) {
            const editingExpense=state.expenses.filter(currentExpense=>currentExpense.id===state.editingId)[0]
            setExpense(editingExpense)
            setPreviousAmount(editingExpense.amount)
        }
    },[state.editingId])

    const handleChangeDate=(value:Value)=>{
        setExpense({...expense,date:value})
    }

    const handleChangeDataForm=(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>)=>{
        const isAmountFile=["amount"].includes(e.target.name);
        setExpense({...expense, [e.target.name]: isAmountFile? Number(e.target.value):e.target.value})
    }

    const handleSubmitForm=(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if (Object.values(expense).includes("")) {
            setError("Todos los campos son requeridos")
            return true;
        }
        if ((expense.amount-previousAmount)>remainingBudget) {
            setError("Gasto fuera del presupuesto")
            return true;
        }
        if (state.editingId) {
            dispatch({type:"update-expense",payload:{expense:{id:state.editingId,...expense}}})
        } else {
            dispatch({type:"add-expense",payload:{expense}})    
        }

        
        setExpense({
            amount:0,
            expenseName:"",
            category:"",
            date:new Date()
        })

    }
  return (
    <form className="space-y-5" onSubmit={handleSubmitForm}>
        <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
            {state.editingId?'Editar Cambios':'Nuevo Gasto'}
        </legend>
        {error&& <ErrorMessaje>{error}</ErrorMessaje>}
        <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className="text-xl">Nombre gasto:</label>
            <input type="text" name="expenseName" placeholder="Añadir nombre gasto" className="bg-slate-100 p-2" id="expenseName" 
            value={expense.expenseName} 
            onChange={handleChangeDataForm}
            />
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="text-xl">Cantidad:</label>
            <input type="number" name="amount" placeholder="Añadir cantidad gasto" className="bg-slate-100 p-2" id="amount" 
            value={expense.amount} onChange={handleChangeDataForm} />
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="category" className="text-xl">Categoria:</label>
            <select name="category" className="bg-slate-100 p-2" id="category" value={expense.category} onChange={handleChangeDataForm}>
                <option value="">--Seleccione---</option>
                {
                categories.map((item)=>
                <option key={item.id} value={item.id}>{item.name}</option>
                )
                }            
            </select>
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="text-xl">Fecha Gasto:</label>
            <DatePicker className="bg-slate-100 p-2 border-0" value={expense.date} onChange={handleChangeDate}/>
        </div>
        <input type="submit" className="uppercase text-white bg-blue-700 rounded-lg w-full py-2 font-bold cursor-pointer" value={state.editingId?"Guardar Cambios":"Registrar Gasto"} />
    </form>
  )
}

export default ExpenseForm