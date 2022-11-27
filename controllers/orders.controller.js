const pool = require("../database/config");

class OrdersController {
    async get(req, res) {
        const data = await pool.query('select *, orders.id as id from orders join customer on  customer.id = orders.customer_id');

        res.json(data.rows);
    }
    async create(req, res) {
        const { sale, orders, checked, customer_id } = req.body;
        const listOrders = orders + '';
        const data = await pool.query(`insert into orders(sale, orders, checked, customer_id) values ($1, $2, $3, $4) returning *`, [sale, `{${listOrders}}`, checked, customer_id]);
        res.json(data);
    }
    async put(req, res) {
        const { id } = req.body;
        const bool = true;
        console.log(id)
        const checked = await pool.query('select * from orders')
        const data = await pool.query('update orders set checked = $1 where id = $2 returning *', [bool, id]);
        console.log(checked.rows)
        res.json(data);
    }
    async delete(req, res) {
        const data = await pool.query('select * from orders where checked = true');
        const rows = data.rows;
        let id = rows.map(elem => elem.customer_id);
        const dataDelete = await pool.query('delete from orders where checked = true returning *');
        for (let i = 0; i < id.length; i++) await pool.query('delete from customer where id = $1', [id[i]]);
        res.json(dataDelete.rows);
    }
}
module.exports = new OrdersController();