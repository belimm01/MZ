const amqp = require('amqplib');
const userAccreditationService = require("./userAccreditationService");

const queue = 'direct_accreditation';

amqp.connect('amqp://localhost')
    .then(connection => {
        return connection.createChannel();
    })
    .then(channel => {
        channel.assertQueue(queue, {durable: false});
        channel.prefetch(1);
        console.log(" [x] Awaiting userAccreditation Requests");
        channel.consume(queue, msg => {
            const requestCorrelationId = msg.content.toString();

            console.log("savage-server: Request find UserAccreditation by correlationId:", requestCorrelationId);

            userAccreditationService.findUserByCorrelationId(requestCorrelationId).then(function (result) {
                console.log("savage-server: Result find UserAccreditation by correlationId", result);

                channel.sendToQueue(msg.properties.replyTo,
                    Buffer.from(JSON.stringify(result)));
            });
            console.log("savage-server: Send response to:", msg.properties.replyTo);

            channel.ack(msg);
        })
    });