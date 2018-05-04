const path = require('path')
const axios = require('axios')
const express = require('express');

const app = express();

module.exports = function(app) {



	app.use(express.static("./dist/client"));
	const path = require('path');
	app.get("/", (req, res) => {
		res.sendFile(path.join(__dirname + "/dist/client/index.html")); // Cannot use render for html unlike pug etc
	});
}
