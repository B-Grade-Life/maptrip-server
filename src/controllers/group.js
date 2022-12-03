var express = require('express');
const { v4: uuidv4 } = require('uuid');

var group = express.Router();


async function _getInfo(req, res) {
	let username = req.body.username;
	let id = req.body.id;
	let password = req.body.password;

	if (username && id && password) {
		res.send('Sign Up!');
	} else {
		res.send('Please enter Username, Id, Password!');
	}
	res.end();
}

async function _create(req, res) {
  	let id = req.body.id;
	let password = req.body.password;

	if (id && password) {
		res.send(uuidv4());
	} else {
		res.send('Please enter Id and Password!');
	}
	res.end();
}

async function _delete(req, res) {
    let id = req.body.id;
	let password = req.body.password;

	if (id && password) {
		res.send(uuidv4());
	} else {
		res.send('Please enter Id and Password!');
	}
	res.end();
}


group.delete('/delete', _delete);
group.post('/create', _create);
group.get('/getInfo', _getInfo);


module.exports = group;
