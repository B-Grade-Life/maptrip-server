var express = require('express');
// const { v4: uuidv4 } = require('uuid');

// const mariadb = require('mariadb');
const usersModel = require("../models/user.model");

var user = express.Router();


async function _signup(req, res) {
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

async function _login(req, res) {
  	let id = req.body.id;
	let password = req.body.password;
	// Ensure the input fields exists and are not empty
	if (id && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		const userData = await usersModel.read(id, password);
    	res.send(userData);
	} else {
		res.send('Please enter Id and Password!');
	}
	res.end();
}

user.post('/signup', _signup);
user.get('/login', _login);


module.exports = user;
