var h3 = require("h3-js");

const pool = require('../utils/db.js');


const getDBCountry = (lat, lon) => {
    let country;
    if (lat > 32.74 && lat < 42.00 && lon > -124.27 && lon < -113.97) {
        country = "cf";
    } else if (lat > 51.25 && lat < 51.72 && lon > -0.57 && lon < 0.37) {
        country = "london";
    } else if (lat > 37.41 && lat < 37.72 && lon > 126.73 && lon < 127.27) {
        country = "seoul";
    } else {
        return false;
    }
    return country;
};

const getPlaceData = async (conn, country, category, h3_code) => {
    sql = `SELECT lat, lon FROM ${country} WHERE category_name = ? AND h3_code = ?;`;
    const data = await conn.query(sql, [category, h3_code]);
    return data;
};


async function place(lat, lon, category) {
    const country = getDBCountry(lat, lon);
    const h3_code = h3.latLngToCell(lat, lon, 5);

    try {
        let conn = await pool.connect();
        const placeData = await getPlaceData(
            conn, country, category, h3_code
        );
        conn.end();

        return placeData;
    } catch (err) {
        throw err;
    }
}


module.exports = { place };
