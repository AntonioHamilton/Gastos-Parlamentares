import Bills from "../models/bills"

export const getHigherExpensesPerCongressman = async (year: number, pageNumber = 1, pageSize = 10, descriptionFilter = '') => {
  const regex = new RegExp(descriptionFilter, "i");

  const aggregationPipeline: any = [
    { $match: { year: year, name: { $regex: regex } } },
    { $group: { _id: { year: "$year", name: "$name", party: "$politicalParty" }, totalSpent: { $sum: "$value" } } },
    { $sort: { totalSpent: -1 } },
    { $skip: pageNumber },
    { $limit: pageSize },
  ]

  const agreggationCountDocuments: any = [
    { $match: { year: year, name: { $regex: regex } } },
    { $group: { _id: { year: "$year", name: "$name", party: "$politicalParty" }, totalSpent: { $sum: "$value" } } },
    { $sort: { totalSpent: -1 } },
    { $count: "totalDocuments" }
  ]

  try {
    const result = await Bills.aggregate(aggregationPipeline).exec()
    const count = await Bills.aggregate(agreggationCountDocuments).exec()

    if (result.length === 0) {
      return { error: "Nenhum resultado encontrado." };
    }

    return { result, totalDocuments: count[0].totalDocuments };
  } catch (error) {
    return { error: "Erro ao obter o gasto total por parlamentar por ano" }
  }
}

