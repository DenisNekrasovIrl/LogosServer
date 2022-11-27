const pool = require("../database/config");
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

class ProductController {
    // Все ок
    async getAll(req, res) {
        const data = await pool.query('select * from product');
        res.json(data.rows);
    }
    // Все ок
    async create(req, res) {
        let data = req.body;
        if (!req.files) return res.send({ message: 'Вы не добавили изображение' })
        const { image } = req.files;
        const imgName = uuid.v4() + '.png';
        image.mv(path.resolve(__dirname, '..', 'static', imgName));
        let updateData = Object.entries(data);
        updateData.unshift(['img', imgName]);
        for (let i = 0; i < updateData.length; i++) {
            if (updateData[i][0] != 'img' && updateData[i][0] != 'title' && updateData[i][0] != 'description') updateData[i] = [updateData[i][0], +updateData[i][1]];
        }
        data = Object.fromEntries(updateData);
        let keys = Object.keys(data);
        let dataValues = [];
        for (let i = 0; i < keys.length; i++) dataValues.push(`$${i + 1}`);
        dataValues += '';
        keys += '';
        let values = Object.values(data);
        const database = await pool.query(`insert into product (${keys}) values (${dataValues}) returning *`, values);
        res.json(database.rows);
    }
    // Все ок
    async get(req, res) {
        const { type } = req.body;
        const data = await pool.query('select * from product where type = $1', [type]);
        res.json(data.rows);
    }
    // Все ок
    async put(req, res) {
        const data = req.body;
        console.log(req.body);
        data.id = +data.id;
        const entries = Object.entries(data);
        console.log(req.files)
        if (req.files) {
            const { image } = req.files;
            const imgName = uuid.v4() + '.png';
            image.mv(path.resolve(__dirname, '..', 'static', imgName));
            const dataImgUpdate = await pool.query('select * from product where id = $1', [data.id]);
            const imgPath = dataImgUpdate.rows[0].img;
            fs.unlink(path.resolve(__dirname, '..', 'static', imgPath), err => console.log(err));
            entries.unshift(['img', imgName])
        }
        entries.unshift(entries.splice(entries.length - 1, 1)[0]);
        const dtoEntries = entries.filter(elem => elem[1] != '');
        const newData = Object.fromEntries(dtoEntries);
        let keys = Object.keys(newData);
        keys = keys.filter(elem => elem != 'id');
        for (let i = 0; i < keys.length; i++) keys[i] = `${keys[i]} = $${i + 2}`;
        keys += '';
        const values = Object.values(newData);
        console.log(keys, values)
        const dataBase = await pool.query(`update product set ${keys} where id = $1 returning *`, values);

        res.json(dataBase);
    }
    // Все ок
    async delete(req, res) {
        const { id } = req.body;
        const elem = await pool.query('select * from product where id = $1', [id]);
        if (!elem.rows[0]) return res.json({ message: 'Данного продукта не существует' })
        let data = await pool.query('delete from product where id = $1 returning *', [id]);
        data = data.rows[0];
        const pathFile = data.img;
        fs.unlink(path.resolve(__dirname, '..', 'static', pathFile), err => {
            console.log(err)
        });
        res.json(data);
    }
    // Все ок
    async getOne(req, res) {
        const { id } = req.body;
        const data = await pool.query('select * from product where id = $1', [id]);
        res.json(data);
    }
    // Все ок
    async getRandom(req, res) {
        const data = await pool.query('select * from product order by random() limit 4');
        res.json(data.rows);
    }
}
module.exports = new ProductController();