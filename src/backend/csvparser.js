const fs = require('fs');
const csv = require('csv-parser');
const Bills = require("./models/bills");

const batchSize = 1000;

const processBatch = (batch) => {
  const documents = [];

  batch.forEach((data) => {

    if (data.numano >= 2016) {
      const document = {
        politicalId: data.nudeputadoid,
        name: data.txnomeparlamentar,
        date: data.datemissao,
        description: data.txtdescricao,
        month: data.nummes,
        year: data.numano,
        politicalParty: data.sgpartido,
        state: data.sguf,
        supplierName: data.txtfornecedor,
        supplierIdentification: data.txtcnpjcpf,
        value: data.vlrdocumento,
        netValue: data.vlrliquido,
        refund: data.vlrrestituicao
      };

      documents.push(document);
    }
  });

  Bills.insertMany(documents)
    .then(() => console.log('Bills saved successfully!'))
    .catch((error) => console.error('Something went wrong! ', error));
};

const processCSV = () => {
  let batch = [];

  fs.createReadStream('./cota-parlamentar.csv')
    .pipe(csv({ objectMode: true }))
    .on('data', (data) => {
      batch.push(data);

      if (batch.length === batchSize) {
        processBatch(batch);
        batch = [];
      }
    })
    .on('end', () => {
      if (batch.length > 0) {
        processBatch(batch);
      }
      console.log('CSV importation done!');
    });
};

module.exports = processCSV;