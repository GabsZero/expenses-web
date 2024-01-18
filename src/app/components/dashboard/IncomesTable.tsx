import Link from "next/link"

type Props = {
  incomes: Income[],
  total: number
}

export default async function IncomesTable({incomes, total} :Props) {
  const incomesMapped = mapExpenses(incomes)

  return (
    <div className="card">
      <div className="card-header">
        <h2>Entradas <Link className="btn btn-lg btn-success" href="/nova-entrada">+ nova entrada</Link></h2>
      </div>
      <div className="card-body">
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data</th>
            <th>Tipo de entrada</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>

            {
              incomes.length > 0 ?
                incomesMapped
              : <tr>
                <td colSpan={50}>Dados Não encontrados</td>
              </tr>
            }
        </tbody>
        <tfoot>
        <tr>
          <th>Total</th>
            <td colSpan={2}></td>
            <td colSpan={50}>R${total}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
  )
}

function mapExpenses(incomes: Income[]) {
  return incomes.map(income => {
    return <tr key={income.ID}>
      <td>{income.Name}</td>
      <td>{new Date(income.date).toLocaleDateString('pt-br')}</td>
      <td>{income.IncomeType.Name}</td>
      <td>R${income.Amount}</td>
    </tr>
  })
}

