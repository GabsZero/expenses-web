import ExpensesTable from "./components/dashboard/expensesTable"

async function getData(mes: string, ano: string) {
  let date: string = `${ano}-${mes}`
  if(!mes || !ano){
    const now: Date = new Date()
    const mes = now.getMonth() + 1

    date = `${now.getFullYear()}-${mes.toString().padStart(2, "0")}`
  }

  const url: string = `http://localhost:8080/getExpensesByMonth?date=${date}`
  const res = await fetch(url)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return await res.json()
}

const geraAnosSelect = (): Array<number> => {
  let anoInicial: number = 2020
  const anoMaximo: number = 2070

  const resultado: Array<number> = []

  while (anoInicial <= anoMaximo) {
      resultado.push(anoInicial)
      anoInicial++
  }
  
  return resultado
}


export default async function Home({searchParams}: any) {
  console.log(searchParams)
  const expensesResponse: any = await getData(searchParams.mes, searchParams.ano)
  const expenses: Expense[] = expensesResponse.expenses
  const anos = geraAnosSelect()

  return (
    <main>
        <form>
          <div className="row mt-3 mb-3">
            <div className="col-md-3">
              <label htmlFor="mes" className ="form-label">Mês</label>
              <select className="form-control" name="mes" id="mes">
                <option value="">Selecione um mês</option>
                <option selected={searchParams.mes == "01"} value="01">Janeiro</option>
                <option selected={searchParams.mes == "02"} value="02">Fevereiro</option>
                <option selected={searchParams.mes == "03"} value="03">Março</option>
                <option selected={searchParams.mes == "04"} value="04">Abril</option>
                <option selected={searchParams.mes == "05"} value="05">maio</option>
                <option selected={searchParams.mes == "06"} value="06">Junho</option>
                <option selected={searchParams.mes == "07"} value="07">Julho</option>
                <option selected={searchParams.mes == "08"} value="08">Agosto</option>
                <option selected={searchParams.mes == "09"} value="09">Setembro</option>
                <option selected={searchParams.mes == "10"} value="10">Outubro</option>
                <option selected={searchParams.mes == "11"} value="11">Novembro</option>
                <option selected={searchParams.mes == "12"} value="12">Dezembro</option>
              </select>
            </div>
            <div className="col-md-3">
            <label htmlFor="ano" className ="form-label">Mês</label>
              <select className="form-control" name="ano" id="ano">
                <option value="">Selecione um ano</option>
                {
                  anos.map(ano => {
                    return <option selected={searchParams.ano == ano} value={ano}>{ano}</option>
                  })
                }
              </select>
            </div>
            <div className="col-md-3">
              <input type="submit" className="btn btn-lg btn-primary" value="Filtrar"/>
            </div>
          </div>
        </form>
        <ExpensesTable expenses={expenses} />
    </main>
  )
}

