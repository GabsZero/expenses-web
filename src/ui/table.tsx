
export default async function ExpensesTable({expenses} :any) {
  
  return (
    <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Current Installment</th>
            <th>TotalInstallments</th>
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
              </tr>
            })
            : <tr>
              <td colSpan={50}>Dados Não encontrados</td>
            </tr>
          }
        </tbody>
      </table>
  )
}