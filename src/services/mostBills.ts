import { api } from "@/config/api";
import { formatMoney } from "@/utils/moneyUtils";

export const mostBills = async ({year = 2016, page = 1, size = 10, description=''}) => {
  const result = await api.get(`/most-bills/${year}/?page=${page}&size=${size}&description=${description}`);

  const dataTransformed = result.data.result.map((item: any) => {
    return {
      "Nome": item._id.name,
      'Partida': item._id.party,
      'Gasto': formatMoney(item.totalSpent),
      "Ano": item._id.year,
    }
  })

  return {data: dataTransformed, totalDocuments: result.data.totalDocuments}
}