# airline-api-assignment2

Airline Ticketing API & AI Chat Agent

This project includes a basic airline ticketing API and a chatbot interface that works with it. The chatbot can process flight-related questions and give answers using either a dummy intent parser or OpenAI.

Technologies Used
Backend API: Spring Boot, Java, PostgreSQL, JWT, Swagger

API Gateway: Node.js, Express, Axios

Frontend: React, Axios, Firebase Firestore

Optional AI: OpenAI API or a custom rule-based parser

Setup Instructions
1. Backend API (Spring Boot)
Go to the airline-api folder:
cd airline-api

Update the PostgreSQL configuration in src/main/resources/application.properties:
spring.datasource.url=jdbc:postgresql://localhost:5432/airline
spring.datasource.username=postgres
spring.datasource.password=postgres

Start the Spring Boot app:
./mvnw spring-boot:run

Open Swagger UI at:
http://localhost:8081/swagger-ui/index.html

2. API Gateway (Node.js)
Go to the gateway folder:
cd gateway
npm install

If you're using OpenAI, create a .env file with this:
OPENAI_API_KEY=your-key-here

Start the gateway:
node index.js

Gateway runs by default on port 3001.

3. React Chat UI
Go to the chat-ui folder:
cd chat-ui
npm install

Create a src/firebase.js file and add your Firebase config.

Start the React app:
npm start

Chat UI will open at:
http://localhost:3000

How to Use
Go to Swagger and log in at /api/v1/auth/login using a test user.

Copy the JWT token from the response.

Click "Authorize" in Swagger and enter:

Bearer your-token-here

Now you can use protected endpoints like searching flights or checking in.

In the React chat UI, type a flight-related question to get a response from AI or dummy logic.

Notes
By default, the system uses a dummy parser. You can switch to OpenAI in the gateway code.

All chat messages are saved to Firebase Firestore under the messages collection.

Make sure all three parts (backend, gateway, frontend) are running.

Prepared by: Işıl Kahraman
