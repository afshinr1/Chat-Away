const mysql = require("mysql");

let connection = mysql.createConnection({
  // host: "sql9.freemysqlhosting.net",
  // user: "sql9374367",
  // password: "k9s7GfADpH",
  // database: "sql9374367",

  host: "localhost",
  user: "root",
  password: "kuraikami",
  database: "seng-513",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to DB!");  
});

module.exports = connection;
