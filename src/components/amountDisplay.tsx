import React from 'react'
import { formantCurrency } from '../helpers'

type amountDisplayProps={
    label?:string,
    amount:number
}

const AmountDisplay = ({label,amount}:amountDisplayProps) => {
  return (
    <p className="text-2xl text-blue-600 font-bold">
        {label && `${label}: `}
        <span className="font-black text-black">{formantCurrency(amount)}</span>
    </p>
  )
}

export default AmountDisplay