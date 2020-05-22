# COURSES-WEB-APP: development strategy

---

## 0. Setup

- forked repository and clone working folder with template to use for the project structure.

## 1. User Story: `GET request, retrieve courses`

- Refactored previous functionality using the project structure template to manage the routes and controllers in separate files.
- User must be able to fetch information from the server using REST  API commands, the server must process the request and give back a response with all or one precise course id.
- The file `index.js` add the functionality to process incoming GET requests `/`, `/api/courses` and `/api/courses/:id`.