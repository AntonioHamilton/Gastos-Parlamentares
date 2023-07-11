import { api } from "@/config/api";
import { months } from "@/constants/filters";
import { formatMoney } from "@/utils/moneyUtils";

export const airTicketByCongressman = async ({year = 2016, page = 1, size = 10, month = 1, description = ''}) => {
  const result = await api.get(`/air-ticket-by-congressman/${year}/?page=${page}&size=${size}&month=${month}&description=${description}`);

  const getData = (item: any) => {
    const Emition = item.data.find((item: any) => item.description === 'Emissão Bilhete Aéreo')
    const airTicket = item.data.find((item: any) => item.description === 'PASSAGENS AÉREAS')
    const roadTicket = item.data.find((item: any) => item.description === 'PASSAGENS TERRESTRES, MARÍTIMAS OU FLUVIAIS')

    if (item.data) {
      return ({
        'Emissão Bilhete Aéreo': formatMoney(Emition?.value),
        'PASSAGENS AÉREAS': formatMoney(airTicket?.value),
        'PASSAGENS TERRESTRES, MARÍTIMAS OU FLUVIAIS': formatMoney(roadTicket?.value),
      })
    }
  }

  const dataTransformed = result.data.result.map((item: any) => {
    return {
      'Nome': item.name,
      'Mês': months[item.month],
      'Partido': item.politicalParty,
      ...getData(item),
      'Gasto': formatMoney(item.totalSpending),
      "Ano": item.year,
    }
  })

  return {data: dataTransformed, totalDocuments: result.data.totalDocuments}
}