const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./controllers/userAccreditationController.js');
const app = express();
const cors = require('cors');
const DB_URL = 'mongodb://admin:adminadmin1@ds149676.mlab.com:49676/mz';
const mongoose = require('./config/mongodb/mongoConfig');

process.env.MONGODB = DB_URL;
mongoose.connect(process.env.MONGODB, {useNewUrlParser: true});
mongoose.connection.on('error', function () {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

routes(app);

let server  = require('http').createServer(app);

server = app.listen(3000, "127.0.0.1", () => {
    console.log("Server listening on port:%s", server.address().port);
});

module.exports = server; // for testing