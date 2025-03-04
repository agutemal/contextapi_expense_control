import React, { useMemo } from 'react'
import { Expense } from '../types'
import { formatDate } from '../helpers'
import AmountDisplay from './amountDisplay'
import { categories } from '../data/categories'
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
  } from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { useBudget } from '../hooks/useBudget'

type ExpenseDetailProps={
    expense: Expense
}


const ExpenseDetail = ({expense}:ExpenseDetailProps) => {
    const categoryInfo=useMemo(()=>categories.filter(cat=>cat.id===expense.category)[0],[expense])
    const {dispatch}=useBudget()

    const handleLeadingAction=()=>( 
        <TrailingActions>
            <SwipeAction onClick={()=>dispatch({type:'get-expense-by-id',payload:{id:expense.id}})} >
                actulizar
            </SwipeAction>
        </TrailingActions>
    )

    const handleTrailingActions=()=>( 
        <TrailingActions>
            <SwipeAction onClick={()=>dispatch({type:'remove-expense',payload:{id:expense.id}})} destructive={true}>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )
    
  return (
    <SwipeableList>
        <SwipeableListItem maxSwipe={30} leadingActions={handleLeadingAction()} trailingActions={handleTrailingActions()}>
            <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
                <div>
                    <img src={`/icono_${categoryInfo.icon}.svg`} className="w-20" />
                </div>
                <div className="flex-1 space-y-2">
                    <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
                    <p>{expense.expenseName}</p>
                    <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
                </div>
                <AmountDisplay amount={expense.amount}/>
            </div>
        </SwipeableListItem>
    </SwipeableList>
  )
}

export default ExpenseDetail