Two serives A,B


"A" talks to mariadb and sends info to rabbitmq, "B" consumes off of that queue

procedure:


1. Analyze microservice, taking notes on inputs and outputs

1.1 npm init
npm install amqplib

2. Create seed data for maria 
    change permissions to executable, painnnnn
3. write shell script to seed maria

4. create function to generate mock data

5. boot up rabbitmq

6. A will send n units of mock data to queue

7. B will consume off queue

8. Create docker compose
    boot maria
    boot rabbit
    boot application a
    depends on maria and rabbit
    boot application b
    depends

9. modify .env to put it in dev mode

10. modify readme to include instructions for local dev







