const express = require('express')
const app = express()
const session = require('express-session')

const bodyParser = require('body-parser')

require('dotenv').config()
const path = require('path')

const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: 'testing_hotel'
})


app.use(session({
    secret: 'Secrect text',
    cookie: { maxAge: 300000 },
    resave: false,
    saveUninitialized: false
}))


// connection.connect()
// try {
//     connection.query(`INSERT INTO test VALUES('Nayan', 01);`)
// } catch (error) {
//     console.log(error)
// }
// connection.end()


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/static', express.static('static'))

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});



app.post('/login', (req, res) => {
    console.log(req.body)
    const { name, pass } = req.body
    if( name && pass){
        if(req.session.authenticated){
            res.json(req.session)
        }else{
            if( pass == 'admin' && name == 'admin'){
                req.session.authenticated = true
                req.session.user = {
                    name, pass
                }
                res.json(req.session)
            }else{
                res.status(403).json({ error: true})
            }
        }
    } else res.status(403).json({ error: true })
})



app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on localhost:%d in %s mode", this.address().port, app.settings.env);
});