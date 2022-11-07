const pool = require('../sql')

async function sqldata() {
    const [rows] = await pool.query('select * from Guest')
    return rows
}


async function template(){
    let data = await sqldata()
    let temp = ''
    data.forEach((e, i) => {
        temp += `<tr>
                    <td>${e.Guest_id}</td>
                    <td>${e.First_name} ${e.Last_name}</td>
                    <td>${e.Contact_number}</td>
                    <td>${e.City}</td>
                    <td>${e.ID_card_type}</td>
                    <td>
                        <div class="payment-in-table-btn">
                            <span class="material-symbols-outlined">
                                visibility
                            </span>
                        </div>
                    </td>
                </tr>`
    });

    return `<div class="dynamic-content">
    <h2>Guest</h2>
    <div class="card">
        <div class="rooms-search-section">
            <label for="search">Search</label>
            <input type="search" name="search" id="search">
        </div>

        <div class="rooms-table-section">
            <table>
                <thead>
                    <tr>
                        <th>Guest Id</th>
                        <th>Name</th>
                        <th>Number</th>
                        <th>City</th>
                        <th>ID Card Type</th>
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