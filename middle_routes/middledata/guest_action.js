const pool = require('../sql')
const formatDate = require('../date')

async function sqldata(id) {
    const [rows] = await pool.query(`select * from Guest where Guest_id=${id}`)
    return rows[0] ? rows[0] : { error: true, message: `Guest Not Found` }
}

module.exports = sqldata
