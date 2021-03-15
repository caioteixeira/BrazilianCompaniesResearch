const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');
const fs = require('fs')

async function getAccount(db, cia_id, account_id) {
  let dfp_query =
    `SELECT YEAR year,
                  VERSAO version,
                  CD_CONTA accountCode,
                  DS_CONTA accountDescription,
                  VL_CONTA value
            FROM dfp
            WHERE ID_CIA == ? AND CD_CONTA == ?`;
    
    let account = {}
    await db.each(dfp_query, [cia_id, account_id], (err, row) => {
      if (err) {
        throw err;
      }
  
      if (account.data == undefined) {
        account.accountCode = row.accountCode;
        account.accountDescripton = row.accountDescription;
        account.data = {};
      }
  
      if (account.data[row.year] == undefined) {
        account.data[row.year] = {};
      }
  
      let yearEntry = account.data[row.year];
      if (yearEntry.version > row.version) {
        return;
      }
  
      yearEntry.version = row.version;
      yearEntry.value = row.value;
    });
  
    return account;
}

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

    company.revenue = await getAccount(db, company.id, "3.01")
    company.financialResult = await getAccount(db, company.id, "3.06")
    company.profit = await getAccount(db, company.id, "3.11")

    fs.writeFile(`../static/data/${company.id}.json`, JSON.stringify(company, undefined, 2), 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
    });
  }

  db.close();
}

main()