'use client';

import { FormEvent, useState } from "react"

export default function NovaDespesa({tiposDespesas}: any) {
  let [error, setError] = useState("")

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    formData.set("isPaid", formData.get('isPaid') == "on" ? "1" : "0")
    formData.set("isRecurring", formData.get('isRecurring') == "on" ? "1" : "0")

    const bodyRequest = new FormData()
    formData.forEach((item, key) => {
      bodyRequest.append(key, item)
    })

    const response = await fetch('http://localhost:8080/expenses', {
      method: 'POST',
      body: bodyRequest
    })

    console.log(!response.ok)
    if(!response.ok){
      setError("Erro ao gravar despesa")
      return false
    }

    const data = await response.json()

    console.log(response)
  }


  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-3">
          <label htmlFor="name">Nome</label>
          <input name="name" id="name" className="form-control" type="text" />
        </div>
        <div className="col-md-3">
          <label htmlFor="date">Data</label>
          <input name="date" id="date" className="form-control" type="date" />
        </div>
        <div className="col-md-3">
          <label htmlFor="currentInstallment">Parcela atual</label>
          <input name="currentInstallment" id="currentInstallment" className="form-control" type="number" />
        </div>
        <div className="col-md-3">
          <label htmlFor="totalInstallments">Total de parcelas</label>
          <input name="totalInstallments" id="totalInstallments" className="form-control" type="number" />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <label htmlFor="expenseTypeId">Tipo de despesa</label>
          <select id="expenseTypeId" className="form-control" name="expenseTypeId">
          <option>Selecione</option>
            <option value="1">Maoe</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="amount">Valor</label>
          <input name="amount" id="amount" className="form-control" type="number" />
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
