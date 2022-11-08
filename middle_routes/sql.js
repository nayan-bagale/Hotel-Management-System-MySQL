const mysql2 = require('mysql2')
require('dotenv').config()

const pool = mysql2.createPool({
    host: 'localhost',
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: 'hotel_management_system'
}).promise()

module.exports = pool