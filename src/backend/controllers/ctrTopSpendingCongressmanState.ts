import Bills from "../models/bills";

const getTopSpendingPoliticiansByStateAndYear = async (year: number, pageNumber = 1, pageSize = 10, state='SE') => {
  const aggregationPipeline: any = [
    {
      $match: { year: year }
    },
    {
      $match: { state: state }
    },
    {
      $group: {
        _id: {
          year: '$year',
          state: '$state',
          politicalId: '$politicalId',
          name: '$name',
          politicalParty: '$politicalParty'
        },
        totalSpending: { $sum: '$value' }
      }
    },
    {
      $project: {
        _id: 0,
        year: '$_id.year',
        state: '$_id.state',
        name: '$_id.name',
        politicalParty: '$_id.politicalParty',
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
    return { error: 'Erro ao obter os parlamentares com maiores gastos por estado e ano' };
  }
};

export default getTopSpendingPoliticiansByStateAndYear