const pool = require("../utils/db.js");


const queryDB = async (conn, username, password) => {
    sql = "SELECT * FROM accounts WHERE username = ? AND password = ?";
    const rows = await conn.query(sql, [username, password]);
    return rows;
};

const getData = async (conn, username, password) => {
    let tmp = await queryDB(conn, username, password);
    return tmp;
};


async function read(username, password) {
    try {
        let conn = await pool.connect();
        const data = await getData(conn, username, password);
        conn.end();

        if (data.length == 1) {
            return data[0];
        } else {
            return false;
        }
    } catch (err) {
        throw err;
    }
}


module.exports = { read };
