
type Props = {
  incomes: Income[]
}

export default async function IncomesTable({incomes} :Props) {
  const incomesMapped = mapExpenses(incomes)
  const total: number = incomes.reduce((currentValue: number, income: Income) => currentValue + income.Amount, 0)

  return (
    <div className="card">
      <div className="card-header">
        <h2>Entradas</h2>
      </div>
      <div className="card-body">
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data</th>
            <th>Parcela atual</th>
            <th>Total de parcelas</th>
            <th>Tipo de despesa</th>
            <th>Valor</th>
            <th>É Recorrente?</th>
            <th>Pago?</th>
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
            <td colSpan={4}></td>
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
      <td>{new Date(income.date).toLocaleDateString()}</td>
      <td>R${income.Amount}</td>
    </tr>
  })
}

