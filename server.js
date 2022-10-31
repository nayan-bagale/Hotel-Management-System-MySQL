const express = require('express')
const app = express()
const session = require('express-session')
require('dotenv').config()
const path = require('path')

const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: 'testing_hotel'
})

connection.connect()
try {
    connection.query(`INSERT INTO test VALUES('Nayan', 01);`)
} catch (error) {
    console.log(error)
}

connection.end()

app.use('/static', express.static('static'))

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on localhost:%d in %s mode", this.address().port, app.settings.env);
});