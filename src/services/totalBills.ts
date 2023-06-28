import { api } from "@/config/api";
import { totalBillsProps } from "@/types";
import { formatMoney } from "@/utils/moneyUtils";

export const totalBills = async ({year = 2016, page = 1, size = 10}) => {
  const result = await api.get(`/total-bills/${year}/?page=${page}&size=${size}`);

  const dataTransformed = result.data.result.map((item: totalBillsProps) => {
    return {
      "Partido": item.party,
      'Gasto Total': formatMoney(item.totalBills),
      "Ano": item.year,
    }
  })

  return {data: dataTransformed, totalDocuments: result.data.totalDocuments}
}