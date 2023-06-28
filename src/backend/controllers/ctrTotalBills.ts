import Bills from "../models/bills"

export const getTotalBillsByPartyByYear = async (year: string, pageNumber = 1, pageSize = 10) => {

  const aggregationPipeline = [
    {
      $group: {
        _id: {
          partido: '$politicalParty',
          ano: `${year}`,
        },
        totalBills: { $sum: '$value' },
      },
    },
    {
      $project: {
        _id: 0,
        party: '$_id.partido',
        year: '$_id.ano',
        totalBills: 1,
      },
    },
    {
      $group: {
        _id: null,
        totalDocuments: { $sum: 1 },
        data: { $push: '$$ROOT' },
      },
    },
    {
      $project: {
        _id: 0,
        totalDocuments: 1,
        data: {
          $slice: ['$data', (pageNumber - 1) * pageSize, pageSize],
        },
      },
    },
  ];

  try {
    const result = await Bills.aggregate(aggregationPipeline);
    return { result: result[0].data, totalDocuments: result[0].totalDocuments};
  } catch (error) {
    return { error: "Erro ao obter o gasto total por partido por ano" }
  }
};