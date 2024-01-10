import Link from "next/link"

type Props = {
  expenses: Expense[],
  total: number
}

export default async function ExpensesTable({expenses, total} :Props) {
  
  async function getExpensesType() {
    const url: string = `http://localhost:8080/getExpensesType`
    const res = await fetch(url)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return await res.json()
  }

  const expensesMapped = mapExpenses(expenses)
  const expensesType = getExpensesType()

  console.log(expensesType)

  return (
    <div className="card">
      <div className="card-header">
        <h2>Despesas <Link className="btn btn-lg btn-success" href="/nova-despesa">+ nova despesa</Link></h2>
        
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
                expensesMapped
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

function mapExpenses(expenses: Expense[]) {
  return expenses.map(expense => {
    return <tr key={expense.ID}>
      <td>{expense.Name}</td>
      <td>{new Date(expense.date).toLocaleDateString()}</td>
      <td>{expense.CurrentInstallment}</td>
      <td>{expense.TotalInstallments}</td>
      <td>{expense.ExpenseType.Name}</td>
      <td>R${expense.Amount}</td>
      <td>{expense.IsRecurring ? 'Sim' : 'Não'}</td>
      <td>{expense.IsPaid ? 'Sim' : 'Não'}</td>
    </tr>
  })
}

