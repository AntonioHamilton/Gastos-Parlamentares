import Bills from "../models/bills";

const getCampaignSpendingByPolitician = async (year: number, pageNumber = 1, pageSize = 10, month = 1, candidateName = '') => {
  const aggregationPipeline: any = [
    {
      $match: {
        description: {
          $regex: new RegExp("DIVULGAÇÃO DA ATIVIDADE PARLAMENTAR.", "i")
        },
        year: year,
        month: month,
        value: { $ne: null, $gte: 0 },
        name: { $regex: new RegExp(candidateName, "i") }
      }
    },
    {
      $group: {
        _id: {
          name: '$name',
          month: '$month',
          year: '$year',
          description: '$description',
          politicalParty: '$politicalParty'
        },
        value: { $sum: '$value' }
      }
    },
    {
      $group: {
        _id: {
          name: '$_id.name',
          month: '$_id.month',
          year: '$_id.year',
          politicalParty: '$_id.politicalParty'
        },
        totalSpending: { $sum: '$value' },
        data: { $push: { description: '$_id.description', value: '$value' } }
      }
    },
    {
      $project: {
        _id: 0,
        name: '$_id.name',
        month: '$_id.month',
        year: '$_id.year',
        politicalParty: '$_id.politicalParty',
        totalSpending: 1,
        data: 1
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
    return { error: 'Erro ao obter os gastos com campanha por parlamentar' };
  }
};

export default getCampaignSpendingByPolitician;