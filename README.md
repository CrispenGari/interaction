### interaction

Interaction is an open-source chat application that allows different people from the world to interact in real time, in either private or public rooms.

### What is this?

This is a simple full stack chat application that allows user to chat publicly and privately using web sockets.

### Techs

This will be an application that contains two packages the `server` and the `web`. The server will act as our backend and the `web` will be a client web application created using react `cra`.

### 1. server

The server will be running as an express application that will be serve a graphql api for messages across rooms. We are going to use Object Relational Model (ORM) to be more specific `mikro-orm` to manage and create entities that will persist data in the `postgres` database.

### 2. web

The web application is using `react.js` with `typescript` as a programming language and `css` for styling components.

### authentication

For the authentication we are going to use `jwt`.

### consuming `graphql` api from the client

We are going to use the graphql-code-generator with hooks to consume the graphql api from the client.

### app icons

We are going to use react icons for the application icons in the frontend.

### colors.

### project description

1. authenticated user has access to all the user in the application, he/she can make private chats with specific user/users
