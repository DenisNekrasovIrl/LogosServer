const pool = require("../database/config");

class CustomerController {
    async create(req, res) {
        const data = req.body;
        let keys = Object.keys(data);
        let dataValues = [];
        for (let i = 0; i < keys.length; i++) dataValues.push(`$${i + 1}`);
        dataValues += '';
        keys += '';
        let values = Object.values(data);
        const database = await pool.query(`insert into customer (${keys}) values (${dataValues}) returning *`, values);
        res.json(database.rows[0]);

    }
}

module.exports = new CustomerController();