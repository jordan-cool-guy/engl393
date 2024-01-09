const amqp = require('amqplib');

const RABBITMQ_HOST = process.env.RABBITMQ_HOST || 'rabbitmq';
const RABBITMQ_QUEUE = process.env.RABBITMQ_QUEUE || 'my_queue';
const amqpUrl = process.env.AMQP_URL || 'amqp://localhost:5672';


async function sendMessageToQueue(queueName, message) {
  try {
    const connection = await amqp.connect(amqpUrl);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: false });
    channel.sendToQueue(queueName, Buffer.from(message));
    console.log(`Message "${message}" sent to queue "${queueName}"`);
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error occurred:', error.message);
  }
}


function getRandomName() {
  const names = ['Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace', 'Henry', 'Isabella', 'Jack', 'Katherine', 'Liam', 'Mia', 'Noah', 'Olivia', 'Peter', 'Quinn', 'Rachel', 'Samuel', 'Taylor', 'Uma', 'Victor', 'Wendy', 'Xander', 'Yasmine', 'Zane'];
  return names[Math.floor(Math.random() * names.length)];
}

function getRandomAge(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomPerson() {
  const name = getRandomName();
  const age = getRandomAge(18, 80); // Generate age between 18 and 80

  const person = {
    name: name,
    age: age
  };

  return JSON.stringify(person);
}







// Usage:
// Replace 'your_queue_name' with the name of your RabbitMQ queue
// Replace 'Your message content' with the actual message you want to send
sendMessageToQueue('example_queue', generateRandomPerson());
