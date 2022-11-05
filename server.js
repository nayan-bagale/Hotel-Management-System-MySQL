const express = require('express')
const app = express()
const session = require('express-session')
const bodyParser = require('body-parser')
const middle_routers = require('./middle_routes/dashboard')

require('dotenv').config()
const path = require('path')

const mysql = require('mysql2')

app.use('/data', middle_routers)

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: 'hotel_management_system'
})

app.get('/sqldata', (req, res) => {

    connection.connect( (err) => {
        if (err) throw err
        connection.query('select * from Guest;', function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        })
    })

    connection.end()

    res.json({
        success: true
    })

})

app.use(session({
    secret: 'Secrect text',
    // cookie: { maxAge: 300000 },
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

app.use('/style', express.static('style'))

app.get('/', (req, res) => {
    if (req.session.authenticated) {
        res.redirect('/static')
    } else {
        res.sendFile(path.join(__dirname, 'public/index.html'));
    }
});

app.use('/static', (req, res, next) => {
    if (!req.session.authenticated) {
        res.redirect('/')
    } else {
        next()
    }
}, express.static('static'))


app.post('/login', (req, res) => {
    const { name, password } = req.body
    if (name && password) {
        if (req.session.authenticated) {
            res.json(req.session)
        } else {
            if ( password == process.env.password && name == process.env.name ) {
                req.session.authenticated = true
                req.session.user = {
                    name, password
                }
                res.json({
                    error: false,
                    message: 'Successfully Logged In'
                })
            } else {
                res.json({ error: true })
            }
        }
    } else res.json({ error: true })
})

app.get('/sign-out', (req, res) => {
    if (req.session.authenticated) {
        req.session.destroy();
    }
    res.json({
        error: false,
        message: 'Successfully Sign-Out'
    });
})



app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on localhost:%d in %s mode", this.address().port, app.settings.env);
});