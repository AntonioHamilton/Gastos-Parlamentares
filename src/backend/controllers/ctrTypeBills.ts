import Bills from "../models/bills";

export const getTypeBillsByYearAndDescription = async (
  year = 2016,
  pageNumber = 1,
  pageSize = 10,
  descriptionFilter = ''
) => {
  const aggregationPipeline: any = [
    {
      $match: {
        year: year,
        description: { $regex: descriptionFilter, $options: 'i' },
      },
    },
    {
      $group: {
        _id: {
          description: '$description',
          year: '$year',
        },
        value: { $sum: '$netValue' },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
    {
      $group: {
        _id: '$_id.year',
        topExpenses: {
          $push: {
            description: '$_id.description',
            value: '$value',
            year: '$_id.year',
          },
        },
        totalDocuments: { $sum: '$count' },
      },
    },
    {
      $project: {
        _id: 0,
        topExpenses: 1,
        totalDocuments: { $size: '$topExpenses' },
      },
    },
  ];

  try {
    const result = await Bills.aggregate(aggregationPipeline);
    const totalDocuments = result[0].totalDocuments;
    const topExpenses = result[0].topExpenses.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);

    return { result: topExpenses, totalDocuments: totalDocuments };
  } catch (error) {
    console.error(error);
    return { error: 'Erro ao obter os tipos de gastos por ano e descrição' };
  }
};