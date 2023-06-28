export type getInitialDataProps = {
  name: string,
  politicalParty: string,
  date: Date,
  description: string,
  state: string,
  supplierIdentification: string,
  supplierName: string,
  netValue: number,
  value: number,
  refund: number
}

export type totalBillsProps = {
  party: string,
  year: number,
  totalBills: number,
}