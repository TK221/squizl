# SquizlWeb
*Written as a seminar work for the Web Development course*

This project defines a quiz-app, to create and share questions for all users. Its also possible to add questions to your collections and play them with you friends.


## Info
**IMPORTANT**: The quiz-lobby is currently in an early stage and not finished yet.
### To Start
1. Install the packages in poth folders with "**npm install**".
2. Build the frontend (squizl-web) to the backend (squizl-server) with "**ng build**" (Angular-cli must be globaly installed).
3. Run the server (squizl-server) with **"npm start"**

If your SQLLite database (dev.db) is **missing** in squizl-server/prisma. You can generate it with "**npx prisma migrate dev**" And "**npx prisma generate**".

### SocketIO
All the quiz-loby informations are transported via socket-io, so there are no CRUD services.

### Quiz-lobby
To test the multiplayer feature of the quiz-lobby, start another private tab, login with another account and join the lobby with its unique name you defined.

## Features
* **Accounts**: You can create an account to save your collections and play a quiz with your friends or alone.
* **Questions**: Its possible to create questions and share them in the question hub.
* **Collections**: Collections are to store all the questions. You can create your own and add as many questions as you want.
* **Quiz lobbies**: Create a lobby with one of your collections and play it with your friends or alone.

## Pages
* /profile: Tow show user informations
* /login: Login page
* /register: Create new account
* /hub:
  * /question: Show all the questions and add them to one of your collection
    * /add: Add new question
  * /collection: Show all your collections
    * /add: Add new collection
* /game
  * /browser: Create new lobby or join one
  * /lobby: Your current lobby
* /error/:errorCode/:errorMessage: Error page

## Tech
- [Prisma]: Prisma helps app developers build faster and make fewer errors with an open source database toolkit for PostgreSQL, MySQL, SQL Server, and SQLite.
- [Socket.IO]: SocketIO is a library that enables real-time, bidirectional and event-based communication between the browser and the server. 
- [SQLLite]: SQLite is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.
- [Angular]: Angular is a development platform, built on TypeScript.
- [ExpressJS]: Fast, unopinionated, minimalist web framework for Node.js.
- [Tailwind CSS]: A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.
- [ESLint]: ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.
- [Bcrypt]: A library to help you hash passwords.

    [Prisma]: <https://www.prisma.io/>
    [Socket.IO]: <https://socket.io/>
    [SQLLite]: <https://sqlite.org/index.html>
    [Angular]: <https://angular.io/>
    [ExpressJS]: <http://expressjs.com/>
    [Tailwind CSS]: <https://tailwindcss.com/>
    [ESLint]: <https://eslint.org/>
    [Bcrypt]: <https://www.npmjs.com/package/bcrypt>
