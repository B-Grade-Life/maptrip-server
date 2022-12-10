const { v4: uuidv4 } = require('uuid');

const pool = require("../utils/db.js");


const select = async (conn, id, password) => {
    sql = "SELECT * FROM user WHERE id = ? AND password = ?";
    const rows = await conn.query(sql, [id, password]);
    return rows;
};


async function read(id, password) {
    try {
        let conn = await pool.connect();
        const data = await select(conn, id, password);
        conn.end();

        if (data.length == 1) {
            return {
                "uuid": data[0].uuid,
                "username": data[0].username
            };
        } else {
            return false;
        }
    } catch (err) {
        throw err;
    }
}


module.exports = { read };
