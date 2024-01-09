type Income = {
  ID: number,
  Name: string,
  date: Date,
  CurrentInstallment: number,
  TotalInstallments: number,
  ExpenseTypeId: number,
  Amount: number,
  type: ExpenseType
  IsPaid: boolean,
  IsRecurring: boolean,
  CreatedAt: Date,
  UpdatedAt: Date,
  DeletedAt: Date
}

type IncomeType = {
  ID: number,
  Name: string,
  Slug: string,
  CreatedAt: Date,
  UpdatedAt: Date,
  DeletedAt: Date

}