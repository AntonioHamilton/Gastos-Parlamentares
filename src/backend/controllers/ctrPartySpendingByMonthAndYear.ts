import Bills from "../models/bills";

const getPartySpendingByMonthAndYear = async (year: number, pageNumber = 1, pageSize = 10, month=1) => {
  const aggregationPipeline: any = [
    {
      $match: {
        year: year,
        month: month,
        value: { $ne: null, $gte: 0 }
      }
    },{
      $group: {
        _id: {
          month: '$month',
          year: '$year',
          politicalParty: '$politicalParty'
        },
        totalSpending: { $sum: '$value' },
        uniqueNames: { $addToSet: '$name' }
      }
    },
    {
      $project: {
        _id: 0,
        month: '$_id.month',
        year: '$_id.year',
        politicalParty: '$_id.politicalParty',
        totalSpending: 1,
        uniqueNames: { $size: '$uniqueNames' }
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
    return { error: 'Erro ao obter os gastos por partido por mês e ano' };
  }
};

export default getPartySpendingByMonthAndYear