const express = require('express')
const router = express.Router()
const path = require('path')

const guest = require('./snippets/guest')
const payments = require('./snippets/payments')
const dashboard = require('./snippets/dashboard')
const rooms = require('./snippets/rooms')
const booking = require('./middledata/booking')
const reservation = require('./snippets/reservation')

const Authentication = (req, res, next) => {
    if (!req.session.authenticated) {
        res.json({
            error: true,
            message: 'Not Authorised'
        })
    } else {
        next()
    }
}

router.get('/guest', Authentication, async (req, res) => {
    res.send(await guest())
})

router.get('/payment', Authentication, async (req, res) => {
    res.send(await payments())
})

router.get('/rooms', Authentication, async (req, res) => {
    res.send(await rooms())
})

router.get('/dashboard', Authentication, async (req, res) => {
    res.send(await dashboard())
})

router.get('/reservation', Authentication, async (req, res) => {
    res.send( reservation() )
})

router.post('/booking', Authentication, async (req, res) => {
    // console.log(await booking(req.body))
    console.log(req.body)
    res.json({
        success: true
    })
})





module.exports = router