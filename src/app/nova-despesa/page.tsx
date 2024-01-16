
import SelectComponent from "../components/store-expense/SelectComponent";
import { permanentRedirect } from "next/navigation";

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
  let error = ""

  const handleSubmit = async (formData: any) => {
    'use server'
    formData.set("isPaid", formData.get('isPaid') == "on" ? "1" : "0")
    formData.set("isRecurring", formData.get('isRecurring') == "on" ? "1" : "0")

    const response = await fetch('http://localhost:8080/expenses', {
      method: 'POST',
      body: formData
    })

    if(!response.ok){
      error = "Erro ao gravar despesa"
      return false
    }

    const data = await response.json()

    console.log(data)

    permanentRedirect("/")
  }
  
  const tiposDespesa =  await getTiposDespesa()

  return (
    <form action={handleSubmit}>
      <div className="row">
      <div className="col-md-3">
        <label htmlFor="name">Nome</label>
        <input name="name" required id="name" className="form-control" type="text" />
      </div>
      <div className="col-md-3">
        <label htmlFor="date">Data</label>
        <input name="date" id="date" required className="form-control" type="date" />
      </div>
      <div className="col-md-3">
        <label htmlFor="currentInstallment">Parcela atual</label>
        <input name="currentInstallment" required id="currentInstallment" className="form-control" type="number" />
      </div>
      <div className="col-md-3">
        <label htmlFor="totalInstallments">Total de parcelas</label>
        <input name="totalInstallments" required id="totalInstallments" className="form-control" type="number" />
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <SelectComponent array={tiposDespesa} label="Tipo de despesa" inputName="expenseTypeId" required="required" />
      </div>
      <div className="col-md-6">
        <label htmlFor="amount">Valor</label>
        <input name="amount" id="amount" step=".01" className="form-control" type="number" />
      </div>
    </div>
    <div className="row text-center mt-3">
      <div className="col-md-12">
        <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
          <input type="checkbox" className="btn-check" id="btncheck1" name="isPaid" autoComplete="off" />
          <label className="btn btn-outline-primary" htmlFor="btncheck1">Tá pago?</label>

          <input type="checkbox" className="btn-check" id="btncheck2" name="isRecurring" autoComplete="off" />
          <label className="btn btn-outline-primary" htmlFor="btncheck2">É recorrente?</label>
        </div>
      </div>
    </div>
    <div className="row text-center mt-3">
      <div className="col-md-12 text-right">
        <input className="btn btn-lg btn-primary" type="submit" value="Enviar" />
      </div>
      {
        error != "" ?
        <div className="row mt-3">
          <div className="col-md-12 text-center alert alert-danger">
            {error}
          </div>
        </div>
        : ""
      }
    </div>
  </form>
  )
}
