const express = require('express')
const router = express.Router()
const path = require('path')

//snippets import
const guest = require('./snippets/guest')
const payments = require('./snippets/payments')
const dashboard = require('./snippets/dashboard')
const rooms = require('./snippets/rooms')
const booking = require('./middledata/booking')
const reservation = require('./snippets/reservation')

// middledata import
const guest_action = require('./middledata/guest_action')

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

// Snippets Routes

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
        error: false,
        message: `Room ${req.body.reservation.room_no} Booked`
    })
})

// Snippets

//Middle data routes

router.get('/guest/:id', async(req, res) => {
    let data = await guest_action(req.params.id)
    res.json(data)
    console.log(data)
})

router.route('/payments/:id')
    .get(async (req, res) => {
        let data = await guest_action(req.params.id)
        res.json(data)
        console.log(data)
    })
    .post(async (req, res) => {
        let data = await guest_action(req.params.id)
        res.json(data)
        console.log(data)
    })

router.route('/rooms/:id')
    .get(async (req, res) => {
        let data = await guest_action(req.params.id)
        res.json(data)
        console.log(data)
    })
    .post(async (req, res) => {
        let data = await guest_action(req.params.id)
        res.json(data)
        console.log(data)
    })


module.exports = router