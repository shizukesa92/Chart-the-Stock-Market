const path = require('path')
const socket = require('socket.io')
const axios = require('axios')
const express = require('express');

const app = express();
const server = app.listen(process.env.PORT || 3000);
const io = socket(server);

module.exports = function(app) {

	app.use(function(req, res, next) {
		res.io = io;
		next();
	});

	app.use(express.static("./dist/client"));
	const path = require('path');
	app.get("/", (req, res) => {
		res.sendFile(path.join(__dirname + "/dist/client/index.html")); // Cannot use render for html unlike pug etc
	});
}
