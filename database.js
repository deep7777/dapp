var mysql = require('mysql')
let host = process.env.DB_ENDPOINT || "localhost";
let user = process.env.DB_USER || "root";
let password = process.env.DB_PASSWORD || "root";
let database = process.env.DB_NAME || "deepak";
let port =  process.env.DB_PORT || "3306";
var connection = mysql.createConnection({
  host,
  user, //
  password, //
  database,
});
connection.connect((err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('Database connected')
});
module.exports = connection;
