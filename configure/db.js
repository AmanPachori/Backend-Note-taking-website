const { Client } = require("pg");
const client = new Client(process.env.PSQL_URL);

//   user: process.env.PSQL_User,
//   host: process.env.PSQL_host,
//   database: process.env.PSQL_db,
//   password: process.env.PSQL_Pass,
//   port: 5432,

module.exports = client;
