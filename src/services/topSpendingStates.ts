import { api } from "@/config/api";
import { formatMoney } from "@/utils/moneyUtils";

export const topSpendingStates = async ({year = 2016, page = 1, size = 10}) => {
  const result = await api.get(`/top-spending-state/${year}/?page=${page}&size=${size}`);

  const dataTransformed = result.data.result.map((item: any) => {
    return {
      "Estado": item.state,
      'Gasto': formatMoney(item.totalSpending),
      "Ano": item.year,
    }
  })

  return {data: dataTransformed, totalDocuments: result.data.totalDocuments}
}