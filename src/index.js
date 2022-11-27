const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const dotenv = require("dotenv");

dotenv.config();

var app = module.exports = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.set('port', process.env.PORT || 5642);
app.use(morgan('dev'));
app.use('/user', require('./controllers/user'));
app.use('/map', require('./controllers/map'));

app.get('/', function(req, res) {
  res.send('Start Maptrip Server.');
});

/* istanbul ignore next */
app.listen(app.get('port'), () => {
  	console.log(app.get('port'), '번 포트에서 대기 중');
});
