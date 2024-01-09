const amqp = require('amqplib');

const RABBITMQ_HOST = process.env.RABBITMQ_HOST || 'rabbitmq';
const RABBITMQ_QUEUE = process.env.RABBITMQ_QUEUE || 'my_queue';
const amqpUrl = process.env.AMQP_URL || 'amqp://localhost:5672';


async function consumeMessagesFromQueue(queueName) {
  try {
    const connection = await amqp.connect(amqpUrl);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: false });
    
    console.log(`Waiting for messages from queue "${queueName}"...`);
    
    channel.consume(queueName, (msg) => {
      if (msg !== null) {
        console.log(`Received message: ${msg.content.toString()}`);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Error occurred:', error.message);
  }
}

// Usage:
// Replace 'your_queue_name' with the name of your RabbitMQ queue
consumeMessagesFromQueue('example_queue');
