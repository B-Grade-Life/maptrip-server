var express = require('express');
const mapModel = require("../models/map.model");

const { haversine } = require('../utils/math.js');


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
        res.send({data: placeData});
    } else {
		res.send('Failed!');
	}
    res.end();
}

async function _shortestDistance(req, res) {
    let body = req.body;
    console.log(body);

    let arr = [];
    for (let i = 0; i < body.length; i++) {
        let e = [];
        for (let j = 0; j < body.length; j++) {
            let d = haversine(
                body[i]["lat"], body[i]["lon"], body[j]["lat"], body[j]["lon"]
            );
            e.push(d);
        }
        arr.push(e);
    }

    // reference: https://taesung1993.tistory.com/48
    const isVisit = new Array(arr.length).fill(false);
    const _getMin = function(vertex) {
        let min = Infinity;
        let idx = 0;
        for (let i = 0; i < vertex.length; i++) {
            if (min > vertex[i] && !isVisit[i]) {
                min = vertex[i];
                idx = i;
            }
        }
        return idx;
    };

    const _dist = function(start) {
        let v = arr[start - 1];
        let count = 0;
        let end = v.length;
        let min = 0;
        let startV = v;
        isVisit[start - 1] = true;

        while (count < end) {
            const idx = _getMin(startV);
            min += startV[idx];
            const next = arr[idx];
            for (let i = 0; i < v.length; i++) {
                if (v[i] > next[i] + min && !isVisit[i]) {
                    v[i] = next[i] + min;
                }
            }
            startV = arr[idx];
            isVisit[idx] = true;
            count++;
        }
        return v;
    };

    let minSum = Infinity;
    let minSum_list = [];
    let minSecSum = Infinity;
    let minSecSum_list = [];
    for (let i = 0; i < arr.length; i++) {
        let sum = 0;
        let arr = _dist(i+1);
        for (let i = 0; i < arr.length; i++){
            sum += arr[i];
        }
        if (sum < minSum) {
            minSecSum = minSum;
            minSecSum_list = minSum_list;
            minSum = sum;
            minSum_list = arr;
        }
    }

    const _category_list = function(tmp_arr) {
        let sorted_minSum_list = tmp_arr.slice();
        sorted_minSum_list.sort(function(a, b) {
            return a - b;
        });

        let idx_list = [];
        for (let i = 0; i < sorted_minSum_list.length; i++) {
            for (let j = 0; j < tmp_arr.length; j++) {
                if (sorted_minSum_list[i] === tmp_arr[j]) {
                    idx_list.push(body[j]["category"]);
                    break;
                }
            }
        }
        return idx_list;
    };

    let minCategory_list = _category_list(minSum_list);
    let minSecCategory_list = _category_list(minSecSum_list);

    console.log(minSum * 1000);
    res.send({
        "data": [
            {
                "distance" : parseInt(minSum * 1000),
                "route": minCategory_list.join(' - ')
            },
            {
                "distance" : parseInt(minSecSum * 1000),
                "route": minSecCategory_list.join(' - ')
            }
        ]
    });
    res.end();
}


map.get('/getMarker', _getMarker);
map.post('/putMarker', _putMarker);
map.put('/modifyMarker', _modifyMarker);
map.get('/getPlace', _getPlace);
map.get('/shortestDistance', _shortestDistance);


module.exports = map;
