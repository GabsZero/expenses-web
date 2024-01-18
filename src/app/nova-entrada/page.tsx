
import Link from "next/link";
import SelectComponent from "../components/store-expense/SelectComponent";
import { permanentRedirect } from "next/navigation";

type IncomeType = {
  id: number,
  name: string
}


const getTiposEntrada = async () => {
  const res = await fetch("http://localhost:8080/getIncomeTypes")

  const incomeTypesResponse = await res.json()
  const incomeTypes: IncomeType[] = incomeTypesResponse.incomeTypes.map(income => {
    return {
      id: income.ID, name: income.Name
    }
  })

  return incomeTypes
}

export default async function NovaEntrada() {

  const handleSubmit = async (formData: any) => {
    'use server'

    console.log(formData)
    const response = await fetch('http://localhost:8080/incomes', {
      method: 'POST',
      body: formData
    })

    const data = await response.json()

    if(!response.ok){
      const errorResponse = data.message
      // TODO: implementar o fluxo triste
      return false
    }

    permanentRedirect("/")
  }
  
  const tiposEntrada =  await getTiposEntrada()

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
      <div className="col-md-6">
        <SelectComponent array={tiposEntrada} label="Tipo de entrada" inputName="incomeTypeId" required="required" />
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <label htmlFor="amount">Valor</label>
        <input name="amount" id="amount" step=".01" className="form-control" type="number" />
      </div>
    </div>
    <div className="row text-center mt-3">
      <div className="col-md-12 text-right">
        <input className="btn btn-lg btn-primary" type="submit" value="Enviar" />
        <Link href="/" className="btn btn-lg btn-outline-secondary ml-3"> Cancelar</Link>
      </div>
    </div>
  </form>
  )
}
