let express = require('express');
let bodyParser = require('body-parser');
let routes = require('./controllers/AkreditaceController.js');
let app = express();
let cors = require('cors');
// const fs = require('fs');
// const https = require('https');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

routes(app);

// https.createServer({
//     key: fs.readFileSync('./cert/server.key'),
//     cert: fs.readFileSync('./cert/server.cert')
// }, app).listen(3000, () => {
//     console.log('Example app listening on port 3000! Go to https://localhost:3000/')
// });


let server = app.listen(3000,  () => {
    console.log("app running on port.", server.address().port);
});