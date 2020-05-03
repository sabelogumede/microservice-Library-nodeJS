#Note!

- To test or run each service in the command line, cd into "/service-name" before running execution commands = "nodemon service-name.js"

#For books/customers services

- npm i --save expess, body-parser, mongoose
- create a mlab booksservice db (save your db username & password )

#Orders service will join both of the above mentioned services in one single point

- we will add "request" library into our installation, which allows for us to send request to other services

- npm install --save express mongoose body-parser request
