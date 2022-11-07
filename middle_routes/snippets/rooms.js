const { checkout } = require('../middleroutes')
const pool = require('../sql')
const formatDate = require('../date')

async function sqldata() {
    const [rows] = await pool.query(` SELECT Rooms.Room_No, Room_types.Room_type, Rooms.Status, Reservation.Check_in, Reservation.Check_out 
                                    FROM Rooms
                                    LEFT JOIN Room_types 
                                    ON Rooms.Room_type_id = Room_types.Room_type_id
                                    LEFT JOIN Reservation 
                                    ON Reservation.Room_No = Rooms.Room_No
                                    GROUP BY Room_No;`)
    return rows
}


async function template() {
    let data = await sqldata()
    const current_date = formatDate(new Date(), 'yyyy-mm-dd')
    let temp = ''
    
    data.forEach((e, i) => {
        temp += `<tr>
                        <td>${e.Room_No}</td>
                        <td>${e.Room_type}</td>
                        <td>
                            ${ e.Status == 'Available' ? '<div class="red-bg td-label">Available</div>' : '<div class="green-bg td-label">Booked</div>'}
                        </td>
                        ${((e) => {
                            if(e.Status == 'Available'){
                                return `<td></td>
                                        <td></td>`
                            }else{
                                if (formatDate(new Date(e.Check_in)) >= current_date && formatDate(new Date(e.Check_out)) > current_date){
                                    return `<td><div class="green-bg td-label">Checked in</div></td>
                                            <td><div class="blue-bg td-label">Check Out</div></td>`
                                }else{
                                    return `<td><div class="yellow-bg td-label">Check</div></td>
                                            <td></td>`
                                }
                            }
                        })(e)}
                        
                        <td>
                            <div class="rooms-in-table-btn">
                                <span class="material-symbols-outlined">
                                    edit_square
                                </span>
                                <span class="material-symbols-outlined">
                                    delete
                                </span>
                            </div>
                        </td>
                    </tr>`
    });

    return `<div class="dynamic-content">
    <h2>Rooms</h2>
    <div class="card">
        <div class="rooms-head-section">
            <h3>Manage Rooms</h3>
            <button>Add Rooms</button>
        </div>
        <div class="rooms-search-section">
            <label for="search">Search</label>
            <input type="search" name="search" id="search">
        </div>

        <div class="rooms-table-section">
            <table>
                <thead>
                    <tr>
                        <th>Room No</th>
                        <th>Room Type</th>
                        <th>Booking Status</th>
                        <th>Check In</th>
                        <th>Check Out</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${temp}
                </tbody>
            </table>
        </div>

    </div>
</div>`

}

module.exports = template