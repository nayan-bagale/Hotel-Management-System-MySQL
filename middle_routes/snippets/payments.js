const pool = require('../sql')

async function sqldata() {
    const [rows] = await pool.query('select * from payments')
    return rows
}


async function template() {
    let data = await sqldata()
    let temp = ''
    data.forEach((e, i) => {
        let snip
        if(e.Remaining){
            snip = `<div class="red-bg td-label">Not Payed</div>`
        }else{
            snip = `<div class="blue-bg td-label">Payed</div>`
        }
        temp += `<tr>
                    <td>${e.First_name} ${e.Last_name}</td>
                    <td>${e.Reservation_id}</td>
                    <td>${e.Guest_id}</td>
                    <td>
                        ${snip}
                    </td>
                    <td>
                        <div class="payment-in-table-btn">
                            <span class="material-symbols-outlined" id="payment-edit">
                                edit_square
                            </span>
                            <span class="material-symbols-outlined" id="payment-view">
                                visibility
                            </span>
                        </div>
                    </td>
                </tr>`
    });

    return `<div class="dynamic-content">
    <h2>Payment</h2>
    <div class="card">
        <div class="rooms-search-section">
            <label for="search">Search</label>
            <input type="search" name="search" id="search">
        </div>

        <div class="rooms-table-section">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Reservation Id</th>
                        <th>Guest Id</th>
                        <th>Status</th>
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