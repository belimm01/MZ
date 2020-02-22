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
            msg => channel.responseEmitter.emit(msg.properties.correlationId, msg.content),
            {noAck: true});

        return channel;
    });

const sendRPCMessage = (channel, message, userAccreditationQueue) => new Promise(resolve => {
    // unique random string
    const correlationId = message.correlationId;
    channel.responseEmitter.once(correlationId, resolve);
    console.log('sending msg to queue ', userAccreditationQueue);
    channel.sendToQueue(userAccreditationQueue, Buffer.from(message), {correlationId, replyTo: REPLY_QUEUE});
    console.log(" [x] Sent %s", message);
});

module.exports.createClient = createClient;
module.exports.sendRPCMessage = sendRPCMessage;