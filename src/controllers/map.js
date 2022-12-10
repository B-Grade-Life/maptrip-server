var express = require('express');
const mapModel = require("../models/map.model");

var map = express.Router();


async function _getMarker(req, res) {
    let groupId = req.body.groupId;

    if (groupId) {
        res.send({
            lat : 37.5666805,
            lon : 126.9784147
        });
    } else {
        res.send("Token Doesn't Exist.");
    }
    res.end();
}

async function _putMarker(req, res) {
    let lat = req.body.lat;
	let lon = req.body.lon;
    let groupId = req.body.groupId;

    if (lat) {
        res.send({
            msg: "Marker added successfully."
        });
    } else {
		res.send('Failed!');
	}
    res.end();
}

async function _modifyMarker(req, res) {
    let lat = req.body.lat;
	let lon = req.body.lon;
    let groupId = req.body.groupId;

    if (lat) {
        res.send({
            msg: "Marker modified successfully."
        });
    } else {
		res.send('Failed!');
	}
    res.end();
}

async function _getPlace(req, res) {
    let lat = req.body.lat;
	let lon = req.body.lon;
    let category = req.body.category;

    if (lat && lon && category) {
        const placeData = await mapModel.place(lat, lon, category);
        res.send(placeData);
    } else {
		res.send('Failed!');
	}
    res.end();
}


map.get('/getMarker', _getMarker);
map.post('/putMarker', _putMarker);
map.put('/modifyMarker', _modifyMarker);
map.get('/getPlace', _getPlace);


module.exports = map;
