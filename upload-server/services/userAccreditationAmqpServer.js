const amqp = require('amqplib');

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

            const request = msg.content.toString();
            console.log(request, "received request from consumer");
            const test_msg = 'suka rabotaet';
            console.log("sending response to ", msg.properties.replyTo);

            channel.sendToQueue(msg.properties.replyTo,
                Buffer.from(test_msg));

            channel.ack(msg);
        })
    });