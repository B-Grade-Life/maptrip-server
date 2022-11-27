var express = require('express');

var map = express.Router();


async function _get_marker(req, res) {
    let token = req.body.token;

    if (token) {
        res.send({
            lat : 37.5666805,
            lon : 126.9784147
        });
    } else {
        res.send("Token Doesn't Exist.");
    }
    res.end();
}

map.get('/marker', _get_marker);


module.exports = map;
