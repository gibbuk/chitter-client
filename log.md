# Log

### 07/02/2023

Branch: java-bug-fix

During development of the Java server two issues identified in this React app to be resolved for proper integration with the server:

1. /login route - The React frontend had a bug that means that it would be expecting status code OK responses even when the login was not valid and returned a BAD REQUEST. This meant that message pop-ups informing the user of the results of requests would break. As this issue is wih the frontend I decided that I should prioritise fixing the frontend functionality than attempting to have the server return confusing status codes.
   RESOLVED: /Login route - additional test added and passed for SignInForm component. In the event of a rejected request the message supplied with the request will be added to the alert window.
   RESOLVED: /Peep route - additional test added and passed for the PeepForm component. In the event of a rejected request the message supplied with the request will be added to the alert window.

2. React expects id fields from in json objects of database documents as being `_id` whereas Java Spring Boot now supplies `id`. Causes console errors.
   RESOLVED: changed instances of `_id` to `id`.
