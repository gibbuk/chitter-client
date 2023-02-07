# Chitter Client

---

## About The Project

This project is the ReactJS client side only of my previous Digital Futures Academy programme challenge, [which can be found here](https://github.com/gibbuk/chitter-challenge-public). The client is the frontend for a twitter like clone.

This client side app has been separated out so that it can be evolved alongside a Java Spring Boot re-implmentation of the original NodeJs app that accompanied it.

The accompanying Java server can be found at [https://github.com/gibbuk/java-server-chitter](https://github.com/gibbuk/java-server-chitter).

---

## Built With

### Front end

ReactJS App with the following imports:

- axios (for handling HTTP requests and responses)
- bootstrap (css styling import only)
- React Router (handling paths within the Reacy App)

Testing - Jest with:

- testing-library/react
- testing-library/user-events
- jest.fn() for mocking axios get/post responses.

---

## Getting Started

### Installation instructions

1. Clone the repo.
2. `npm install` to install dependencies.
3. `npm test` to run unit tests.
4. Run the server from [https://github.com/gibbuk/java-server-chitter](https://github.com/gibbuk/java-server-chitter).
5. `npm start` to run the client app.

React app will run on `localhost:3000`. It expects the server to be available on `localhost:4000`.
