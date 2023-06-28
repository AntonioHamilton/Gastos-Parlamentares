import { api } from "@/config/api"
import { getInitialDataProps } from "@/types"
import { formatDate } from "@/utils/dateUtils"
import { formatMoney } from "@/utils/moneyUtils"

export const getInitialData = async ({page = 1, size = 10}) => {
  const result = await api.get(`?page=${page}&size=${size}`)

  const dataTransformed = result.data.result.map((item: getInitialDataProps) => {
    return {
      'Nome': item.name,
      'Partido Político': item.politicalParty,
      'Data': formatDate(item.date),
      'Descrição': item.description,
      'Estado': item.state,
      'CNPJ do Fornecedor': item.supplierIdentification,
      'Nome do Fornecedor': item.supplierName,
      'Valor Líquido': formatMoney(item.netValue),
      'Valor Total': formatMoney(item.value),
    }
  })

  return {data: dataTransformed, totalDocuments: result.data.totalDocuments}
}