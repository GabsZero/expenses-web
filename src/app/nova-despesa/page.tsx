
import { FormEvent, useEffect, useState } from "react"
import StoreForm from "../components/store-expense/storeExpenseForm";

type ExpenseType = {
  id: number,
  name: string
}


const getTiposDespesa = async () => {
  const res = await fetch("http://localhost:8080/getExpensesType")

  const expensesTypeResponse = await res.json()
  const expensesType: ExpenseType[] = expensesTypeResponse.expensesType.map(expense => {
    return {
      id: expense.ID, name: expense.Name
    }
  })

  return expensesType
}

export default async function NovaDespesa() {
  
  const tiposDespesa =  await getTiposDespesa()

  return (
   <StoreForm tiposDespesa={tiposDespesa} />
  )
}
