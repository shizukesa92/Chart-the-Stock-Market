const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require("dotenv").config({
	path: "./.env"
});
const axios = require('axios')

const app = express();
const routes = require('./server/routes/routes');

const uri = process.env.MONGOLAB_URI;
mongoose.connect(uri);
app.use(function(req, res, next) {
	res.io = io;
	next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(routes)

const socket = require('socket.io')

const server = app.listen(process.env.PORT || 3000);
const io = socket(server);


app.use(express.static("./dist/client"));
const path = require('path');
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/dist/client/index.html")); // Cannot use render for html unlike pug etc
});
