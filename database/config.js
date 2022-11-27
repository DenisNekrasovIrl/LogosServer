const Pool = require('pg').Pool;
const pool = new Pool({
    connectionString: 'postgres://database_logos_user:l7U4A249WccyLqeYP09RlW1CodVmylKG@dpg-ce12bgla4996ndsmhsqg-a.frankfurt-postgres.render.com/database_logos_namedata_w8fy',
    ssl: {
      rejectUnauthorized: false
    }
})
module.exports = pool;