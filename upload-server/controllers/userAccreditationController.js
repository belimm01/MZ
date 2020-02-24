const amqpClient = require('../services/amqpClient');

let channel;
amqpClient.createClient({url: 'amqp:localhost'})
    .then(ch => {
        // channel is kept for later use
        channel = ch;
    });

let appRouter = (app) => {
    //get specific user by correlationId and token
    app.get('/userAccreditation/:correlationId/:token', (req, res) => {
        amqpClient.sendUserAccreditationMessage(channel, req, 'get','direct_accreditation')
            .then(msg => {
                console.log(" [x] upload-server: Get userAccreditation response:", msg.toString());
                res.json(JSON.parse(msg.toString()));
            });
    });

    app.put('/userAccreditation/:correlationId', (req, res) => {
        console.log("request - body",req.body);
        amqpClient.sendUserAccreditationMessage(channel, req, 'update','direct_accreditation')
            .then(msg => {
                console.log(" [x] upload-server: Update userAccreditation response:", msg.toString());
                res.json(JSON.parse(msg.toString()));
            });
    });
};

module.exports = appRouter;