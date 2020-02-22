const amqpClient = require('../services/amqpClient');

let channel;
amqpClient.createClient({ url: 'amqp:localhost' })
    .then(ch => {
        // channel is kept for later use
        channel = ch;
    });

let appRouter = (app) => {
    //get specific user by correlationId
    app.get('/userAccreditation/id/:correlationId', (req, res) => {
        const result = req.body[0];
        console.log('upload-server get user request', result);
        amqpClient.sendRPCMessage(channel, result.toString(), 'direct_accreditation')
            .then(msg => {
                console.log(msg.toString())
                const result = msg.toString();
                res.json(result);
            });
    });
};

module.exports = appRouter;