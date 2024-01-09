type Income = {
  ID: number,
  Name: string
  date: Date
  Amount: number,
  IncomeType: IncomeType
}

type IncomeType = {
    ID: number,
    Name: string,
    Slug: string,
}