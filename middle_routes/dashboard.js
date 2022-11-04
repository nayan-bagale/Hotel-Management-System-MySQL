const express = require('express')
const router = express.Router()

router.get('/dashboard', (req, res) => {
    res.json({
        Total_Rooms: 45,
        Reservations: 5,
        Booked_Rooms: 2,
        Available_Rooms: 4,
        Checked_In: 2,
        Pending_Payments: 6,
        Total_Earnings: 40000,
        Pending_Payments: 2000
    })
})

router.post('/reservation', (req, res) => {
    console.log(req.body)
})

router.get('/dashboard', (req, res) => {
    res.json({
        Total_Rooms: 45,
        Reservations: 5,
        Booked_Rooms: 2,
        Available_Rooms: 4,
        Checked_In: 2,
        Pending_Payments: 6,
        Total_Earnings: 40000,
        Pending_Payments: 2000
    })
})

router.get('/dashboard', (req, res) => {
    res.json()
})

module.exports = router