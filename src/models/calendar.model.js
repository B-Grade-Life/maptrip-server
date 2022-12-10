const { v4: uuidv4 } = require('uuid');

const pool = require("../utils/db.js");


const insert = async (conn, username, title, content, from_date, to_date) => {
    sql = "INSERT INTO calendar (uuid, username, title, content, from_date, to_date)" +
          "VALUES (?, ?, ?, ?, ?, ?)";
    await conn.query(sql, [uuidv4(), username, title, content, from_date, to_date]);
};

const select = async (conn, username, from_date) => {
    sql = "SELECT * FROM calendar WHERE username = ? AND from_date = ?";
    const rows = await conn.query(sql, [username, from_date]);
    return rows;
};


async function write(username, title, content, from_date, to_date) {
    try {
        let conn = await pool.connect();
        await insert(conn, username, title, content, from_date, to_date);
        conn.end();
        return true;
    } catch (err) {
        throw err;
    }
    return false;
}

async function read(username, from_date) {
    try {
        let conn = await pool.connect();
        const data = await select(conn, username, from_date);
        conn.end();

        if (data.length == 1) {
            return {
                "title": data[0].title,
                "content": data[0].content,
                "from_date": data[0].from_date,
                "to_date": data[0].to_date,
            };
        } else {
            return false;
        }
    } catch (err) {
        throw err;
    }
}


module.exports = { write, read };
