const mysql = require("mysql")
const dotenv = require("dotenv");
dotenv.config();
console.log(process.env.MYSQL_DB);
const db = mysql.createConnection(process.env.MYSQL_DB)
module.exports = db;