const mariadb = require("mariadb");


const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

function connect() {
    return new Promise(function (res, rej) {
        pool.getConnection()
            .then(function (conn) {
                res(conn);
            })
            .catch(function (error) {
                rej(error);
            });
    });
}

module.exports = {
    connect
};
