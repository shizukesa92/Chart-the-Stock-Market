const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require("dotenv").config({
	path: "./.env"
});

const app = express();
const routes = require('./server/routes/routes');

const uri = "mongodb://localhost:27017/" || "process.env.MONGOLAB_URI";
mongoose.connect(uri);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
routes(app);


app.listen(process.env.PORT || 3000);
