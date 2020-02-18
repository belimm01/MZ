let express = require('express');
let bodyParser = require('body-parser');
let routes = require('./controllers/userAccreditationController.js');
let app = express();
let cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

routes(app);

let server = app.listen(3000, "127.0.0.1", () => {
    console.log("Server listening on port:%s", server.address().port);
});