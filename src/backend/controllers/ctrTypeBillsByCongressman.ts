import Bills from "../models/bills";

const getMaxTypeBillsByCongressman = async (year: number, pageNumber = 1, pageSize = 10, description='') => {
  const aggregationPipeline = [
    {
      $match: { year: year }
    },
    {
      $match: { name: { $regex: description, $options: 'i' } }
    },
    {
      $group: {
        _id: {
          politicalId: '$politicalId',
          name: '$name',
          politicalParty: '$politicalParty',
          year: '$year'
        },
        maxSpending: { $max: '$value' },
        description: { $first: '$description' }
      }
    },
    {
      $project: {
        _id: 0,
        politicalId: '$_id.politicalId',
        name: '$_id.name',
        politicalParty: '$_id.politicalParty',
        year: '$_id.year',
        description: 1,
        maxSpending: 1
      }
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
    return { error: 'Erro ao obter o maior gasto por parlamentar por ano' };
  }
};

export default getMaxTypeBillsByCongressman