import Bills from "../models/bills"

export const getAllData = async (pageNumber = 1, pageSize = 10) => {
  try {
    const result = await Bills.find()
    .select('-__v -_id -politicalId -month -year')
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)

    return { result, totalDocuments: await Bills.countDocuments() }
  } catch (error) {
    return { error: "Erro ao obter o gasto total por partido por ano" }
  }
};