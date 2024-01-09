
type Props = {
  expenses: Expense[]
}

export default async function ExpensesTable({expenses} :Props) {
  
  return (
    <div className="card">
      <div className="card-header">
        <h2>Despesas</h2>
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
              expenses.length > 0 ?
                expenses.map(expense => {
                return <tr key={expense.ID}>
                  <td>{expense.Name}</td>
                  <td>{new Date(expense.date).toLocaleDateString()}</td>
                  <td>{expense.CurrentInstallment}</td>
                  <td>{expense.TotalInstallments}</td>
                  <td>{expense.ExpenseTypeId}</td>
                  <td>{expense.Amount}</td>
                  <td>{expense.IsRecurring ? 'Sim' : 'Não'}</td>
                  <td>{expense.IsPaid ? 'Sim' : 'Não'}</td>
                </tr>
              })
              : <tr>
                <td colSpan={50}>Dados Não encontrados</td>
              </tr>
            }
        </tbody>
      </table>
    </div>
  </div>
  )
}
