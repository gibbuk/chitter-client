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

---

### Project Review and Roadmap

The [original project's README.md](https://github.com/gibbuk/chitter-challenge-public/blob/main/README.md) contains details of my original learning.

Details of the changes made as part of this project are included in the [log.md file](./log.md).

Improvements that could be made:

- Some information is transferred on creating a peep that it would be best practice not to. E.g. providing the date and time of the peep and the user's username and real name in addition to the the user's details. The date and time would make more sense to be created by the server at the point of accepting a peep. It would be better for the the data transferred to be kept to a minimum. E.g user's unique id number and the peep content only.
- Moving to a more secure form of authentication such as Json Web Tokens to avoid passwords being stored in the clear within the session of the app.

Additional features:

- Ability for users to change their own peeps via compoents that allow edittig and PUT requests to the server.
- Ability for users to delete their own peeps via a delete button and DELETE requests to the server.
- Ability for users to "like" peep's by others via a like button and making requests to the server (PUT or POST depending on implementation).
