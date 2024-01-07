import ExpensesTable from "@/ui/table"


  async function getData() {
    console.log('hello')
    const res = await fetch('http://localhost:8080/expenses')
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return await res.json()
  }

  export default async function Page() {
    const data: any = await getData()
    const expenses: Expense[] = data.expenses
    return <ExpensesTable expenses={expenses} />
  }


