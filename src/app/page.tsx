import ExpensesTable from "@/ui/table"


async function getData(mes: string, ano: string) {
  let date: string = `${ano}-${mes}-01`
  if(!mes || !ano){
    date = ""
  }

  console.log(date)
  const url: string = `http://localhost:8080/expenses?date=${date}`
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


export default async function Home({searchParams}) {
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
                <option value="01">Janeiro</option>
                <option value="02">Fevereiro</option>
                <option value="03">Março</option>
                <option value="04">Abril</option>
                <option value="05">maio</option>
                <option value="06">Junho</option>
                <option value="07">Julho</option>
                <option value="08">Agosto</option>
                <option value="09">Setembro</option>
                <option value="10">Outubro</option>
                <option value="11">Novembro</option>
                <option value="12">Dezembro</option>
              </select>
            </div>
            <div className="col-md-3">
            <label htmlFor="ano" className ="form-label">Mês</label>
              <select className="form-control" name="ano" id="ano">
                <option value="">Selecione um ano</option>
                {
                  anos.map(ano => {
                    return <option value={ano}>{ano}</option>
                  })
                }
              </select>
            </div>
            <div className="col-md-3">
              <input type="submit" className="btn btn-lg btn-primary" value="Filtrar"/>
            </div>
          </div>
        </form>
      <div className="card">
        <div className="card-header">
          <h2>Despesas</h2>
        </div>
        <div className="card-body">
          <ExpensesTable expenses={expenses} />
        </div>
      </div>
    </main>
  )
}

