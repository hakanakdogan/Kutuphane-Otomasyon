
const mySql = require("mysql");
//MySQL

const pool = mySql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "kutuphane"
})

module.exports = pool;