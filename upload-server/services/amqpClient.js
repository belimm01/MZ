const amqp = require('amqplib');
const EventEmitter = require('events');

// this queue name will be attached to "replyTo" property on producer's message,
// and the consumer will use it to know which queue to the response back to the producer
const REPLY_QUEUE = 'amq.rabbitmq.reply-to';

const createClient = () => amqp.connect('amqp://localhost')
    .then(conn => conn.createChannel()) // create channel
    .then(channel => {
        channel.responseEmitter = new EventEmitter();
        channel.responseEmitter.setMaxListeners(0);
        channel.consume(REPLY_QUEUE,
            msg => channel.responseEmitter.emit("userAccreditation", msg.content),
            {noAck: true});

        return channel;
    });

const sendUserAccreditationMessage = (channel, req, method, userAccreditationQueue) => new Promise(resolve => {
    let message = {};
    message.correlationId = req.params.correlationId;
    message.token = req.params.token;
    message.method = method;
    message.body = req.body;

    channel.responseEmitter.once("userAccreditation", resolve);
    channel.sendToQueue(userAccreditationQueue, Buffer.from(JSON.stringify(message)), {message, replyTo: REPLY_QUEUE});
    console.log(" [x] Sent sendUserAccreditationMessage %s", JSON.stringify(message));
});

module.exports.createClient = createClient;
module.exports.sendUserAccreditationMessage = sendUserAccreditationMessage;