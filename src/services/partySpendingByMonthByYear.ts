import { api } from "@/config/api";
import { months } from "@/constants/filters";
import { formatMoney } from "@/utils/moneyUtils";

export const partySpendingByMonthByYear = async ({year = 2016, page = 1, size = 10, month=1}) => {
  const result = await api.get(`/party-spending-month-year/${year}/?page=${page}&size=${size}&month=${month}`);

  const dataTransformed = result.data.result.map((item: any) => {
    return {
      "Mês": months[item.month],
      "Quantidade de parlamentares no partido": item.uniqueNames,
      'Partido': item.politicalParty,
      'Gasto': formatMoney(item.totalSpending),
      "Ano": item.year,
    }
  })

  return {data: dataTransformed, totalDocuments: result.data.totalDocuments}
}