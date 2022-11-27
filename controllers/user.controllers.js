const pool = require('../database/config');
class UserController {
    // Все ок везде
    async registrationAdmin(req, res) {
        const { login, password } = req.body;
        const candidate = await pool.query(`SELECT * from admin where login = $1`, [login]);
        if (candidate.rows.length >= 1) {
            return res.json({ message: 'Пользователь существует' });
        }
        const data = await pool.query(`insert into admin (login, password) values ($1, $2) returning *`, [login, password]);
        res.json(data.rows);
    }
    async loginAdmin(req, res) {
        const { login, password } = req.body;
        const candidate = await pool.query(`SELECT * from admin where login = $1`, [login]);
        if (candidate.rows.length <= 0) {
            return res.json({ message: 'Пользователя не существует' });
        }
        if (candidate.rows[0].password != password) {
            return res.json({ message: 'Пароль не верный' });
        }
        res.json({ message: 'Вы успешно авторизовались', auth: true });
    }
    async logoutAdmin(req, res) {
        res.json({ message: 'Вы успешно вышли', auth: false });
    }
}

module.exports = new UserController();