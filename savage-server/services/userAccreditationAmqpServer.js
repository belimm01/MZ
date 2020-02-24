const amqp = require('amqplib');
const userAccreditationService = require("./userAccreditationService");

const queueAccreditation = 'direct_accreditation';

amqp.connect('amqp://localhost')
    .then(connection => {
        return connection.createChannel();
    })
    .then(channel => {
        channel.assertQueue(queueAccreditation, {durable: false});
        channel.prefetch(1);
        console.log(" [x] Awaiting userAccreditation Requests");
        channel.consume(queueAccreditation, msg => {
            console.log("savage-server: Got msg from upload-server: " + msg.content);

            const inputMessage = JSON.parse(msg.content);
            const correlationId = inputMessage.correlationId;
            const token = inputMessage.token;
            const method = inputMessage.method;
            const body = inputMessage.body;

            if (method === 'get') {
                userAccreditationService.findUserByCorrelationId(correlationId, token).then(function (result) {
                    console.log(" [x] savage-server: Result find UserAccreditation by correlationId and token", result);

                    channel.sendToQueue(msg.properties.replyTo,
                        Buffer.from(JSON.stringify(result)));
                });
            } else if (method === 'update') {
                userAccreditationService.findUserByCorrelationIdAndUpdate(correlationId, body).then(function (result) {
                    console.log(" [x] savage-server: Result find UserAccreditation by correlationId and update", result);

                    channel.sendToQueue(msg.properties.replyTo,
                        Buffer.from(JSON.stringify(result)));
                });
            }

            console.log(" [x] savage-server: Send response to:", msg.properties.replyTo);

            channel.ack(msg);
        })
    });