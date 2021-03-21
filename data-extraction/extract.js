const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');
const fs = require('fs');
const neatCsv = require('neat-csv');

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

async function prepare_fca_table(db) {
  let drop = `DROP TABLE IF EXISTS "fca_mobiliario"`;
  await db.exec(drop);

  let create = 
    `CREATE TABLE "fca_mobiliario" (
        "CNPJ_Companhia"	TEXT,
        "Data_Referencia"	TEXT,
        "Versao"	INTEGER,
        "ID_Documento"	INTEGER,
        "Valor_Mobiliario"	TEXT,
        "Sigla_Classe_Acao_Preferencial"	TEXT,
        "Classe_Acao_Preferencial"	TEXT,
        "Codigo_Negociacao"	TEXT,
        "Composicao_BDR_Unit"	TEXT,
        "Mercado"	TEXT,
        "Sigla_Entidade_Administradora"	TEXT,
        "Entidade_Administradora"	TEXT,
        "Data_Inicio_Negociacao"	TEXT,
        "Data_Fim_Negociacao"	TEXT,
        "Segmento"	TEXT,
        "Data_Inicio_Listagem"	TEXT,
        "Data_Fim_Listagem"	TEXT
      )`;
  await db.exec(create);
}

async function load_fca(db) {
  console.log("Begin to load FCA");

  await prepare_fca_table(db);

  let stream = fs.readFileSync('.data/fca_cia_aberta_valor_mobiliario_2020.csv');

  const csv = await neatCsv(stream, {separator: ';'});

  let array = csv.map(entry => Object.entries(entry).map(value => value[1]));
  console.log(array);

  for (let index = 0; index < array.length; index++) {
    const values = array[index];
    
    db.run(`INSERT INTO "fca_mobiliario" (
      "CNPJ_Companhia",
      "Data_Referencia",
      "Versao",
      "ID_Documento",
      "Valor_Mobiliario",
      "Sigla_Classe_Acao_Preferencial",
      "Classe_Acao_Preferencial",
      "Codigo_Negociacao",
      "Composicao_BDR_Unit",
      "Mercado",
      "Sigla_Entidade_Administradora",
      "Entidade_Administradora",
      "Data_Inicio_Negociacao",
      "Data_Fim_Negociacao",
      "Segmento",
      "Data_Inicio_Listagem",
      "Data_Fim_Listagem"
    ) VALUES (
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?
    )`, values);


  }

  console.log("loaded FCA :) ");
}

async function main() {
  const db = await sqlite.open({ filename: '.data/rapina.db', driver: sqlite3.Database });

  await load_fca(db);

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