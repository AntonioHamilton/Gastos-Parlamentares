import { api } from "@/config/api";
import { formatMoney } from "@/utils/moneyUtils";

export const topSpendingCongressmanState = async ({year = 2016, page = 1, size = 10, state='SE'}) => {
  const result = await api.get(`/top-spending-congressman-state/${year}/?page=${page}&size=${size}&state=${state}`);

  const dataTransformed = result.data.result.map((item: any) => {
    return {
      "Nome": item.name,
      "Partido": item.politicalParty,
      "Estado": item.state,
      'Gasto': formatMoney(item.totalSpending),
      "Ano": item.year,
    }
  })

  return {data: dataTransformed, totalDocuments: result.data.totalDocuments}
}