var h3 = require("h3-js");

const pool = require('../utils/db.js');
const { haversine, azimuth } = require('../utils/math.js');


const getCountry = (lat, lon) => {
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


function getKmList(km) {
    return [km * (1/4), km * (2/4), km * (3/4), km * (4/4)];
}

function getAngleList(angle) {
    let arr = [0];
    let tmp = 360 / angle;
    for (let i = 0; i < tmp; i++) {
        arr.push(360 * ( (i+1) / tmp));
    }
    return arr;
}


const getPlaceData = async (conn, country, category, lat, lon) => {
    const h3_code = h3.latLngToCell(lat, lon, 5);
    const km_list = getKmList(0.5);
    const angle_list = getAngleList(30);

    sql = `SELECT lat, lon FROM ${country} WHERE h3_code = ?;`;
    const tmp = await conn.query(sql, [h3_code]);

    let arr = new Array(48).fill(0);

    let count = 0;
    for (let i = 0; i < tmp.length; i++){
        let d = haversine(lat, lon, tmp[i]["lat"], tmp[i]["lon"]);
        let a = azimuth(lat, lon, tmp[i]["lat"], tmp[i]["lon"]);
        if (d <= km_list[0]) {
            let w = 0;
            count += 1;
            if ( a > angle_list[0] && a <= angle_list[1]) {
                arr[0 + 12 * w] += 1;
            } else if ( a > angle_list[1] && a <= angle_list[2]) {
                arr[1 + 12 * w] += 1;
            } else if ( a > angle_list[2] && a <= angle_list[3]) {
                arr[2 + 12 * w] += 1;
            } else if ( a > angle_list[3] && a <= angle_list[4]) {
                arr[3 + 12 * w] += 1;
            } else if ( a > angle_list[4] && a <= angle_list[5]) {
                arr[4 + 12 * w] += 1;
            } else if ( a > angle_list[5] && a <= angle_list[6]) {
                arr[5 + 12 * w] += 1;
            } else if ( a > angle_list[6] && a <= angle_list[7]) {
                arr[6 + 12 * w] += 1;
            } else if ( a > angle_list[7] && a <= angle_list[8]) {
                arr[7 + 12 * w] += 1;
            } else if ( a > angle_list[8] && a <= angle_list[9]) {
                arr[8 + 12 * w] += 1;
            } else if ( a > angle_list[9] && a <= angle_list[10]) {
                arr[9 + 12 * w] += 1;
            } else if ( a > angle_list[10] && a <= angle_list[11]) {
                arr[10 + 12 * w] += 1;
            } else if ( a > angle_list[11] && a <= angle_list[12]) {
                arr[11 + 12 * w] += 1;
            }
        } else if ( d > km_list[0] && d <= km_list[1] ) {
            count += 1;
            let w = 1;
            if ( a > angle_list[0] && a <= angle_list[1]) {
                arr[0 + 12 * w] += 1;
            } else if ( a > angle_list[1] && a <= angle_list[2]) {
                arr[1 + 12 * w] += 1;
            } else if ( a > angle_list[2] && a <= angle_list[3]) {
                arr[2 + 12 * w] += 1;
            } else if ( a > angle_list[3] && a <= angle_list[4]) {
                arr[3 + 12 * w] += 1;
            } else if ( a > angle_list[4] && a <= angle_list[5]) {
                arr[4 + 12 * w] += 1;
            } else if ( a > angle_list[5] && a <= angle_list[6]) {
                arr[5 + 12 * w] += 1;
            } else if ( a > angle_list[6] && a <= angle_list[7]) {
                arr[6 + 12 * w] += 1;
            } else if ( a > angle_list[7] && a <= angle_list[8]) {
                arr[7 + 12 * w] += 1;
            } else if ( a > angle_list[8] && a <= angle_list[9]) {
                arr[8 + 12 * w] += 1;
            } else if ( a > angle_list[9] && a <= angle_list[10]) {
                arr[9 + 12 * w] += 1;
            } else if ( a > angle_list[10] && a <= angle_list[11]) {
                arr[10 + 12 * w] += 1;
            } else if ( a > angle_list[11] && a <= angle_list[12]) {
                arr[11 + 12 * w] += 1;
            }
        } else if ( d > km_list[1] && d <= km_list[2] ) {
            count += 1;
            let w = 2;
            if ( a > angle_list[0] && a <= angle_list[1]) {
                arr[0 + 12 * w] += 1;
            } else if ( a > angle_list[1] && a <= angle_list[2]) {
                arr[1 + 12 * w] += 1;
            } else if ( a > angle_list[2] && a <= angle_list[3]) {
                arr[2 + 12 * w] += 1;
            } else if ( a > angle_list[3] && a <= angle_list[4]) {
                arr[3 + 12 * w] += 1;
            } else if ( a > angle_list[4] && a <= angle_list[5]) {
                arr[4 + 12 * w] += 1;
            } else if ( a > angle_list[5] && a <= angle_list[6]) {
                arr[5 + 12 * w] += 1;
            } else if ( a > angle_list[6] && a <= angle_list[7]) {
                arr[6 + 12 * w] += 1;
            } else if ( a > angle_list[7] && a <= angle_list[8]) {
                arr[7 + 12 * w] += 1;
            } else if ( a > angle_list[8] && a <= angle_list[9]) {
                arr[8 + 12 * w] += 1;
            } else if ( a > angle_list[9] && a <= angle_list[10]) {
                arr[9 + 12 * w] += 1;
            } else if ( a > angle_list[10] && a <= angle_list[11]) {
                arr[10 + 12 * w] += 1;
            } else if ( a > angle_list[11] && a <= angle_list[12]) {
                arr[11 + 12 * w] += 1;
            }
        } else if ( d > km_list[2] && d <= km_list[3] ) {
            count += 1;
            let w = 3;
            if ( a > angle_list[0] && a <= angle_list[1]) {
                arr[0 + 12 * w] += 1;
            } else if ( a > angle_list[1] && a <= angle_list[2]) {
                arr[1 + 12 * w] += 1;
            } else if ( a > angle_list[2] && a <= angle_list[3]) {
                arr[2 + 12 * w] += 1;
            } else if ( a > angle_list[3] && a <= angle_list[4]) {
                arr[3 + 12 * w] += 1;
            } else if ( a > angle_list[4] && a <= angle_list[5]) {
                arr[4 + 12 * w] += 1;
            } else if ( a > angle_list[5] && a <= angle_list[6]) {
                arr[5 + 12 * w] += 1;
            } else if ( a > angle_list[6] && a <= angle_list[7]) {
                arr[6 + 12 * w] += 1;
            } else if ( a > angle_list[7] && a <= angle_list[8]) {
                arr[7 + 12 * w] += 1;
            } else if ( a > angle_list[8] && a <= angle_list[9]) {
                arr[8 + 12 * w] += 1;
            } else if ( a > angle_list[9] && a <= angle_list[10]) {
                arr[9 + 12 * w] += 1;
            } else if ( a > angle_list[10] && a <= angle_list[11]) {
                arr[10 + 12 * w] += 1;
            } else if ( a > angle_list[11] && a <= angle_list[12]) {
                arr[11 + 12 * w] += 1;
            }
        }
    }

    sql = `SELECT lat, lon FROM ${country} WHERE category_name = ? AND h3_code = ?;`;
    const category_data = await conn.query(sql, [category, h3_code]);

    let category_arr = [];
    const weight = (count / 48) * 2;
    for (let i = 0; i < category_data.length; i++){
        let d = haversine(lat, lon, category_data[i]["lat"], category_data[i]["lon"]);
        let a = azimuth(lat, lon, category_data[i]["lat"], category_data[i]["lon"]);
        if (d <= km_list[0]) {
            let w = 0;
            if ( a > angle_list[0] && a <= angle_list[1]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[0 + 12 * w] / weight,
                });
            } else if ( a > angle_list[1] && a <= angle_list[2]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[1 + 12 * w] / weight,
                });
            } else if ( a > angle_list[2] && a <= angle_list[3]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[2 + 12 * w] / weight,
                });
            } else if ( a > angle_list[3] && a <= angle_list[4]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[3 + 12 * w] / weight,
                });
            } else if ( a > angle_list[4] && a <= angle_list[5]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[4 + 12 * w] / weight,
                });
            } else if ( a > angle_list[5] && a <= angle_list[6]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[5 + 12 * w] / weight,
                });
            } else if ( a > angle_list[6] && a <= angle_list[7]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[6 + 12 * w] / weight,
                });
            } else if ( a > angle_list[7] && a <= angle_list[8]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[7 + 12 * w] / weight,
                });
            } else if ( a > angle_list[8] && a <= angle_list[9]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[8 + 12 * w] / weight,
                });
            } else if ( a > angle_list[9] && a <= angle_list[10]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[9 + 12 * w] / weight,
                });
            } else if ( a > angle_list[10] && a <= angle_list[11]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[10 + 12 * w] / weight,
                });
            } else if ( a > angle_list[11] && a <= angle_list[12]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[11 + 12 * w] / weight,
                });
            }
        } else if ( d > km_list[0] && d <= km_list[1] ) {
            let w = 1;
            if ( a > angle_list[0] && a <= angle_list[1]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[0 + 12 * w] / weight,
                });
            } else if ( a > angle_list[1] && a <= angle_list[2]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[1 + 12 * w] / weight,
                });
            } else if ( a > angle_list[2] && a <= angle_list[3]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[2 + 12 * w] / weight,
                });
            } else if ( a > angle_list[3] && a <= angle_list[4]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[3 + 12 * w] / weight,
                });
            } else if ( a > angle_list[4] && a <= angle_list[5]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[4 + 12 * w] / weight,
                });
            } else if ( a > angle_list[5] && a <= angle_list[6]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[5 + 12 * w] / weight,
                });
            } else if ( a > angle_list[6] && a <= angle_list[7]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[6 + 12 * w] / weight,
                });
            } else if ( a > angle_list[7] && a <= angle_list[8]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[7 + 12 * w] / weight,
                });
            } else if ( a > angle_list[8] && a <= angle_list[9]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[8 + 12 * w] / weight,
                });
            } else if ( a > angle_list[9] && a <= angle_list[10]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[9 + 12 * w] / weight,
                });
            } else if ( a > angle_list[10] && a <= angle_list[11]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[10 + 12 * w] / weight,
                });
            } else if ( a > angle_list[11] && a <= angle_list[12]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[11 + 12 * w] / weight,
                });
            }
        } else if ( d > km_list[1] && d <= km_list[2] ) {
            let w = 2;
            if ( a > angle_list[0] && a <= angle_list[1]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[0 + 12 * w] / weight,
                });
            } else if ( a > angle_list[1] && a <= angle_list[2]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[1 + 12 * w] / weight,
                });
            } else if ( a > angle_list[2] && a <= angle_list[3]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[2 + 12 * w] / weight,
                });
            } else if ( a > angle_list[3] && a <= angle_list[4]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[3 + 12 * w] / weight,
                });
            } else if ( a > angle_list[4] && a <= angle_list[5]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[4 + 12 * w] / weight,
                });
            } else if ( a > angle_list[5] && a <= angle_list[6]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[5 + 12 * w] / weight,
                });
            } else if ( a > angle_list[6] && a <= angle_list[7]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[6 + 12 * w] / weight,
                });
            } else if ( a > angle_list[7] && a <= angle_list[8]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[7 + 12 * w] / weight,
                });
            } else if ( a > angle_list[8] && a <= angle_list[9]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[8 + 12 * w] / weight,
                });
            } else if ( a > angle_list[9] && a <= angle_list[10]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[9 + 12 * w] / weight,
                });
            } else if ( a > angle_list[10] && a <= angle_list[11]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[10 + 12 * w] / weight,
                });
            } else if ( a > angle_list[11] && a <= angle_list[12]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[11 + 12 * w] / weight,
                });
            }
        } else if ( d > km_list[2] && d <= km_list[3] ) {
            let w = 3;
            if ( a > angle_list[0] && a <= angle_list[1]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[0 + 12 * w] / weight,
                });
            } else if ( a > angle_list[1] && a <= angle_list[2]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[1 + 12 * w] / weight,
                });
            } else if ( a > angle_list[2] && a <= angle_list[3]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[2 + 12 * w] / weight,
                });
            } else if ( a > angle_list[3] && a <= angle_list[4]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[3 + 12 * w] / weight,
                });
            } else if ( a > angle_list[4] && a <= angle_list[5]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[4 + 12 * w] / weight,
                });
            } else if ( a > angle_list[5] && a <= angle_list[6]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[5 + 12 * w] / weight,
                });
            } else if ( a > angle_list[6] && a <= angle_list[7]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[6 + 12 * w] / weight,
                });
            } else if ( a > angle_list[7] && a <= angle_list[8]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[7 + 12 * w] / weight,
                });
            } else if ( a > angle_list[8] && a <= angle_list[9]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[8 + 12 * w] / weight,
                });
            } else if ( a > angle_list[9] && a <= angle_list[10]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[9 + 12 * w] / weight,
                });
            } else if ( a > angle_list[10] && a <= angle_list[11]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[10 + 12 * w] / weight,
                });
            } else if ( a > angle_list[11] && a <= angle_list[12]) {
                category_arr.push({
                    lat: category_data[i]["lat"],
                    lon: category_data[i]["lon"],
                    opacity: arr[11 + 12 * w] / weight,
                });
            }
        }
    }

    const filteredArr = category_arr.reduce((acc, current) => {
        const x = acc.find(item => item.lat === current.lat && item.lon === current.lon);
        if (!x) {
            let e = {
                lat: current.lat,
                lon: current.lon,
                opacity: current.opacity,
                category: category
            };
            return acc.concat([e]);
        } else {
            return acc;
        }
    }, []);
    return filteredArr;
};


async function place(lat, lon, category) {
    const country = getCountry(lat, lon);
    
    try {
        let conn = await pool.connect();
        const placeData = await getPlaceData(
            conn, country, category, lat, lon
        );
        conn.end();

        return placeData;
    } catch (err) {
        throw err;
    }
}


module.exports = { place };
