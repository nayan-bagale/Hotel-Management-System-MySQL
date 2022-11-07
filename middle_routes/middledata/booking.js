const pool = require('../sql')
const formatDate = require('../date')

async function sqldata(data) {

    const { guest, reservation, payment } = data

    const current_date = formatDate(new Date(), 'yyyy-mm-dd')

    const check_guest_exist = await pool.query(`select Guest_id from Guest where Email='${guest.email}'`)
    var guest_id
    if (!check_guest_exist[0].length){
        console.log('notexist')
        await pool.query(`INSERT INTO Guest(First_name, Last_name, Email, Contact_number, ID_card_type, ID_card_Number, Residential_address, City)
                        VALUES('${guest.fname}', '${guest.lname}', '${guest.email}', ${guest.contact_number}, '${guest.id_card_type}', '${guest.id_card_number}', '${guest.address}', '${guest.city}');`)
        guest_id = await pool.query(`select Guest_id from Guest where Email='${guest.email}'`)
    }else{
        
         guest_id = check_guest_exist
    }
    guest_id = guest_id[0][0].Guest_id

    console.log(guest_id)

    await pool.query(`INSERT INTO Reservation(Guest_id, Room_No, Reservation_date, Check_in, Check_out) 
                    VALUES(${guest_id}, ${reservation.room_no}, '${current_date}', '${reservation.check_in}', '${reservation.check_out}');`)
    let reservation_id = await pool.query(`SELECT Reservation_id FROM Reservation ORDER BY Reservation_id DESC LIMIT 1`)
    reservation_id = reservation_id[0][0].Reservation_id

    await pool.query(` INSERT INTO Payments(Reservation_id, Guest_id, First_name, Last_name, Remaining) 
                        VALUES( ${reservation_id}, ${guest_id}, '${guest.fname}', '${guest.lname}', ${payment.total_amount});`)

    await pool.query(`UPDATE Rooms SET Status= 'Booked' WHERE Room_No=${reservation.room_no};`)

    return true
}

module.exports = sqldata