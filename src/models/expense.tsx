type Expense = {
  ID: number,
  Name: string,
  date: Date,
  CurrentInstallment: number,
  TotalInstallments: number,
  ExpenseTypeId: number,
  Amount: number,
  ExpenseType: ExpenseType
  IsPaid: boolean,
  IsRecurring: boolean,
  CreatedAt: Date,
  UpdatedAt: Date,
  DeletedAt: Date
}

type ExpenseType = {
  ID: number,
  Name: string,
  Slug: string,
  CreatedAt: Date,
  UpdatedAt: Date,
  DeletedAt: Date

}