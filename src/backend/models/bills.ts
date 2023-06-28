import mongoose from 'mongoose';
const Schema = mongoose.Schema

const billsSchema = new Schema({
  politicalId: { type: Number, require: false },
  date: { type: Date, require: false },
  year: { type: Number, require: false },
  month: { type: Number, require: false },
  name: { type: String, require: false },
  politicalParty: { type: String, require: false },
  state: { type: String, require: false },
  description: { type: String, require: false },
  supplierName: { type: String, require: false },
  supplierIdentification: { type: String, require: false },
  value: { type: Number, require: false },
  netValue: { type: Number, require: false },
  refund: { type: Number, require: false },
})

export default mongoose.models.Bills || mongoose.model('Bills', billsSchema)
//Pergunta 1
// [
//   { $match: { year: 2018 } },
//   {
//     $group: {
//       _id: "$politicalParty",
//       totalExpense: { $sum: "$value" }
//     }
//   }
// ]

// //Pergunta 2
// [
//   {
//     $group: {
//       _id: {
//         politicalParty: "$politicalParty",
//         year: "$year"
//       },
//       averageExpense: { $avg: "$value" }
//     }
//   },
//   {
//     $group: {
//       _id: "$_id.politicalParty",
//       yearlyAverageExpenses: { $push: { year: "$_id.year", averageExpense: "$averageExpense" } }
//     }
//   }
// ]

// //Pergunta 3
// [
//   {
//     $group: {
//       _id: "$description",
//       count: { $sum: 1 }
//     }
//   },
//   {
//     $sort: { count: -1 }
//   },
//   {
//     $limit: 20
//   }
// ]

// //Pergunta 4
// [
//   {
//     $match: {
//       year: { $gte: 2016, $lte: 2020 }
//     }
//   },
//   {
//     $group: {
//       _id: { year: "$year", name: "$name", politicalParty: "$politicalParty" },
//       totalExpense: { $sum: "$value" }
//     }
//   },
//   {
//     $sort: {
//       "_id.year": 1,
//       totalExpense: -1
//     }
//   },
//   {
//     $group: {
//       _id: "$_id.year",
//       topSpenders: { $push: { name: "$_id.name", politicalParty: "$_id.politicalParty", totalExpense: "$totalExpense" } }
//     }
//   }
// ]

// //Pergunta 5
// [
//   {
//     $match: {
//       year: { $gte: 2016, $lte: 2020 }
//     }
//   },
//   {
//     $group: {
//       _id: { year: "$year", name: "$name", politicalParty: "$politicalParty" },
//       totalExpense: { $sum: "$value" }
//     }
//   },
//   {
//     $sort: {
//       "_id.year": 1,
//       totalExpense: 1
//     }
//   },
//   {
//     $group: {
//       _id: "$_id.year",
//       lowestSpenders: { $push: { name: "$_id.name", politicalParty: "$_id.politicalParty", totalExpense: "$totalExpense" } }
//     }
//   }
// ]

// //Pergunta 6
// [
//   {
//     $group: {
//       _id: "$name",
//       maxExpense: { $max: "$value" },
//       description: { $first: "$description" }
//     }
//   },
//   {
//     $project: {
//       _id: 0,
//       name: "$_id",
//       maxExpense: 1,
//       description: 1
//     }
//   }
// ]

// //Pergunta 7

// [
//   {
//     $match: {
//       description: { $regex: /comida|alimentação|restaurante|refeição/i }
//     }
//   },
//   {
//     $group: {
//       _id: "$name",
//       totalExpense: { $sum: "$value" },
//       description: { $first: "$description" }
//     }
//   },
//   {
//     $project: {
//       _id: 0,
//       name: "$_id",
//       totalExpense: 1,
//       description: 1
//     }
//   }
// ]

// //Pergunta 8

// [
//   {
//     $match: {
//       year: 2018
//     }
//   },
//   {
//     $group: {
//       _id: null,
//       totalExpense: { $sum: "$value" }
//     }
//   },
//   {
//     $project: {
//       _id: 0,
//       totalExpense: 1
//     }
//   }
// ]

// //Pergunta 9

// [
//   {
//     $group: {
//       _id: {
//         state: "$state",
//         year: "$year",
//         politicalParty: "$politicalParty"
//       },
//       totalExpense: { $sum: "$value" }
//     }
//   },
//   {
//     $sort: {
//       "_id.state": 1,
//       "_id.year": 1,
//       totalExpense: -1
//     }
//   },
//   {
//     $group: {
//       _id: {
//         state: "$_id.state",
//         year: "$_id.year"
//       },
//       topParty: { $first: "$_id.politicalParty" },
//       totalExpense: { $first: "$totalExpense" }
//     }
//   },
//   {
//     $sort: {
//       "_id.state": 1,
//       "_id.year": 1
//     }
//   }
// ]

// //Pergunta 10

// [
//   {
//     $group: {
//       _id: {
//         state: "$state",
//         year: "$year"
//       },
//       totalExpense: { $sum: "$value" }
//     }
//   },
//   {
//     $sort: {
//       "_id.year": 1,
//       totalExpense: -1
//     }
//   },
//   {
//     $group: {
//       _id: "$_id.year",
//       topState: { $first: "$_id.state" },
//       totalExpense: { $first: "$totalExpense" }
//     }
//   },
//   {
//     $sort: {
//       _id: 1
//     }
//   }
// ]

// //Pergunta 11

// [
//   {
//     $group: {
//       _id: {
//         state: "$state",
//         year: "$year"
//       },
//       totalExpense: { $sum: "$value" }
//     }
//   },
//   {
//     $sort: {
//       "_id.year": 1,
//       totalExpense: 1
//     }
//   },
//   {
//     $group: {
//       _id: "$_id.year",
//       topState: { $first: "$_id.state" },
//       totalExpense: { $first: "$totalExpense" }
//     }
//   },
//   {
//     $sort: {
//       _id: 1
//     }
//   }
// ]