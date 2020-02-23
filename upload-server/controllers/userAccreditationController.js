const amqpClient = require('../services/amqpClient');

let channel;
amqpClient.createClient({url: 'amqp:localhost'})
    .then(ch => {
        // channel is kept for later use
        channel = ch;
    });

let appRouter = (app) => {
    //get specific user by correlationId
    app.get('/userAccreditation/id/:correlationId', (req, res) => {
        const correlationId = req.params.correlationId;
        console.log('upload-server: Got user request', correlationId);
        amqpClient.sendUserAccreditationMessage(channel, correlationId.toString(), 'direct_accreditation')
            .then(msg => {
                console.log("upload-server: Got userAccreditation response:", msg.toString());
                res.json(JSON.parse(msg.toString()));
            });
    });
};

module.exports = appRouter;