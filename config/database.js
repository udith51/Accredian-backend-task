const mysql = require("mysql")
const dotenv = require("dotenv");
dotenv.config();
console.log(process.env.MYSQL_URL);
const db = mysql.createConnection(process.env.MYSQL_URL)
module.exports = db;