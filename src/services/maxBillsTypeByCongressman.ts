import { api } from "@/config/api";
import { totalBillsProps } from "@/types";
import { formatMoney } from "@/utils/moneyUtils";

export const maxBillsTypeByCongressman = async ({year = 2016, page = 1, size = 10, description=''}) => {
  const result = await api.get(`/max-bills-type-congressman/${year}/?page=${page}&size=${size}&description=${description}`);

  const dataTransformed = result.data.result.map((item: any) => {
    return {
      "Nome": item.name,
      'Descrição': item.description,
      'Partido': item.politicalParty,
      'Gasto': formatMoney(item.maxSpending),
      "Ano": item.year,
    }
  })

  return {data: dataTransformed, totalDocuments: result.data.totalDocuments}
}