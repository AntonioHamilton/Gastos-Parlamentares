import Bills from "../models/bills";

const getTopSpendingStatesByYear = async (year: number, pageNumber = 1, pageSize = 10) => {
  const aggregationPipeline: any = [
    {
      $match: { year: year }
    },
    {
      $group: {
        _id: {
          year: '$year',
          state: '$state'
        },
        totalSpending: { $sum: '$value' }
      }
    },
    {
      $project: {
        _id: 0,
        year: '$_id.year',
        state: '$_id.state',
        totalSpending: 1
      }
    },
    {
      $sort: { totalSpending: -1 }
    },
    {
      $group: {
        _id: null,
        totalDocuments: { $sum: 1 },
        data: { $push: '$$ROOT' }
      }
    },
    {
      $project: {
        _id: 0,
        totalDocuments: 1,
        data: {
          $slice: ['$data', (pageNumber - 1) * pageSize, pageSize]
        }
      }
    }
  ];

  try {
    const result = await Bills.aggregate(aggregationPipeline);
    return { result: result[0].data, totalDocuments: result[0].totalDocuments };
  } catch (error) {
    return { error: 'Erro ao obter os estados com maiores gastos por ano' };
  }
};

export default getTopSpendingStatesByYear