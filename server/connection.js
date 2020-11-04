const mysql = require("mysql");

let connection = mysql.createConnection({
  host: "sql9.freemysqlhosting.net",
  user: "sql9374367",
  password: "k9s7GfADpH",
  database: "sql9374367",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to DB!");  
});

module.exports = connection;
