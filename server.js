const express = require('express')
const app = express()
const session = require('express-session')
const bodyParser = require('body-parser')
const middle_routers = require('./middle_routes/middleroutes')

require('dotenv').config({ path: "./vars/.env" })
const path = require('path')


app.use(session({
    secret: 'Secret text',
    // cookie: { maxAge: 300000 },
    resave: false,
    saveUninitialized: false
}))


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/data', middle_routers)

app.use('/style', express.static('style'))

app.get('/', (req, res) => {
    if (req.session.authenticated) {
        res.redirect('/admin')
    } else {
        res.sendFile(path.join(__dirname, 'public/index.html'));
    }
});

app.use('/admin', (req, res) => {
    if (!req.session.authenticated) {
        res.redirect('/')
    } else {
        res.sendFile(path.join(__dirname, 'private/index.html'));
    }
})


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