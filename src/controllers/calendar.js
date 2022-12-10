var express = require('express');
const { v4: uuidv4 } = require('uuid');

const calendarModel = require("../models/calendar.model");
var calendar = express.Router();


async function _insert(req, res) {
	let username = req.body.username;
	let title = req.body.title;
	let content = req.body.content;
	let from_date = req.body.from_date;
	let to_date = req.body.to_date;

	if (username && title && content && from_date && to_date) {
		const calendarData = await calendarModel.write(
			username, title, content, from_date, to_date
		);
		res.send(calendarData);
	} else {
		res.send("Please enter Username, Title, Content, From_date, To_date!");
	}
	res.end();
}

async function _select(req, res) {
	let username = req.body.username;
	let from_date = req.body.from_date;

	if (username && from_date) {
		const calendarData = await calendarModel.read(username, from_date);
    	res.send(calendarData);
	} else {
		res.send('Please enter Username and From_date!');
		
	}
	res.end();
}


calendar.post('/insert', _insert);
calendar.get('/select', _select);


module.exports = calendar;
