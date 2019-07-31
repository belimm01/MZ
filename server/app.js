let express = require('express');
let bodyParser = require('body-parser');
let routes = require('./controllers/AkreditaceController.js');
let app = express();
let cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

routes(app);

let server = app.listen(3000,  () => {
    console.log("app running on port.", server.address().port);
});