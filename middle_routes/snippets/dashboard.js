const pool = require('../sql')
const formatDate = require('../date')


async function sqldata() {
    const current_date = formatDate(new Date(), 'yyyy-mm-dd')
    const total_rooms = await pool.query('select count(*) from rooms')
    const pending_paymens = await pool.query('select count(*) from payments where Remaining > 0')
    const booked_rooms = await pool.query(`select count(*) from Rooms where Status = 'Booked'`)
    const availabe_rooms = await pool.query(`select count(*) from Rooms where Status != 'Booked'`)
    const pending_amount = await pool.query('select sum(Remaining) from payments')
    const payed_amount = await pool.query('select sum(Payed_amount) from payments')
    const check_in = await pool.query(`select count(*) from Reservation where Check_in >= '${current_date}' OR Check_out > '${current_date}'`)
    const check_out = await pool.query(`select count(*) from Reservation where Check_out < '${current_date}'`)


    return obj = {
        total_rooms: total_rooms[0][0]['count(*)'],
        booked_rooms: booked_rooms[0][0]['count(*)'],
        availabe_rooms: availabe_rooms[0][0]['count(*)'],
        check_in: check_in[0][0]['count(*)'],
        check_out: check_out[0][0]['count(*)'],
        pending_paymens: pending_paymens[0][0]['count(*)'],
        pending_amount: parseInt(pending_amount[0][0]['sum(Remaining)']),
        payed_amount: parseInt(payed_amount[0][0]['sum(Payed_amount)'])
    }
}


async function template() {
    let data = await sqldata()
    
    return `<div class="dynamic-content">
    <h2>Dashboard</h2>
    <div class="grid-card">
        <div class="card">
            <span class="material-symbols-outlined">
                hotel
            </span>
            <h4>${data.total_rooms}</h4>
            <h3>Total Rooms</h3>
        </div>
        <div class="card">
            <span class="material-symbols-outlined">
                beenhere
            </span>
            <h4>${data.booked_rooms}</h4>
            <h3>Booked Rooms</h3>
        </div>
        <div class="card">
            <span class="material-symbols-outlined">
                check_circle
            </span>
            <h4>${data.availabe_rooms}</h4>
            <h3>Available Rooms</h3>
        </div>
        <div class="card">
            <span class="material-symbols-outlined">
                login
            </span>
            <h4>${data.check_in}</h4>
            <h3>Checked In</h3>
        </div>
        <div class="card">
            <span class="material-symbols-outlined">
                logout
            </span>
            <h4>${data.check_out}</h4>
            <h3>Checked Out</h3>
        </div>
        <div class="card">
            <span class="material-symbols-outlined">
                wifi_protected_setup
            </span>
            <h4>${data.pending_paymens}</h4>
            <h3>Pending Payments</h3>
        </div>
    </div>
    <div class="card card-dashboard">
        <div>
            <span class="material-symbols-outlined">
                account_balance
            </span>
            <h4>${data.payed_amount}/-</h4>
            <h3>Total Earnings</h3>
        </div>
        <div>
            <span class="material-symbols-outlined">
                credit_card
            </span>
            <h4>${data.pending_amount}/-</h4>
            <h3>Pending Payment</h3>
        </div>
    </div>
</div>`

}

module.exports = template