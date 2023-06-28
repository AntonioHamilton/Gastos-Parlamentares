import { api } from "@/config/api";
import { totalBillsProps } from "@/types";
import { formatMoney } from "@/utils/moneyUtils";

export const billsType = async ({year = 2016, page = 1, size = 10, description=''}) => {
  const result = await api.get(`/bills-type/${year}/?page=${page}&size=${size}&description=${description}`);

  const dataTransformed = result.data.result.map((item: any) => {
    return {
      "Descrição": item.description,
      'Gasto': formatMoney(item.value),
      "Ano": item.year,
    }
  })

  return {data: dataTransformed, totalDocuments: result.data.totalDocuments}
}