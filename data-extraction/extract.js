const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');
const fs = require('fs')

async function extractDFP(db, cia_id) {
  let dfp_query =
    `SELECT YEAR year,
                  VERSAO version,
                  CD_CONTA accountCode,
                  DS_CONTA accountDescription,
                  VL_CONTA value
            FROM dfp
            WHERE ID_CIA == ?
            ORDER BY CD_CONTA`;
  let dfp = {}

  //const rows = await db.all(dfp_query, [cia_id]);

  await db.each(dfp_query, [cia_id], (err, row) => {
    if (err) {
      throw err;
    }

    if (dfp[row.accountCode] == undefined) {
      let entry = {};
      entry.accountCode = row.accountCode;
      entry.accountDescripton = row.accountDescription;
      entry.data = {};
      dfp[row.accountCode] = entry;
    }

    if (dfp[row.accountCode].data[row.year] == undefined) {
      dfp[row.accountCode].data[row.year] = {};
    }

    let yearEntry = dfp[row.accountCode].data[row.year];
    if (yearEntry.version > row.version) {
      return;
    }

    yearEntry.version = row.version;
    yearEntry.value = row.value;
  });

  return dfp;
};

async function main() {
  const db = await sqlite.open({ filename: '.data/rapina.db', driver: sqlite3.Database });

  let sql = `SELECT ID id,
                  CNPJ cnpj,
                  NAME name
            FROM companies`;
  const rows = await db.all(sql);

  for (let index = 0; index < rows.length; index++) {
    const row = rows[index];

    let company = {};
    company.id = row.id;
    company.cnpj = row.cnpj;
    company.name = row.name;

    company.dfp = await extractDFP(db, company.id)

    fs.writeFile(`../static/data/${company.id}.json`, JSON.stringify(company, undefined, 2), 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
    });
  }

  db.close();
}

main()