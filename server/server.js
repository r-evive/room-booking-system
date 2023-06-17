const express = require('express');
const db = require('./initDB');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const usersRoute = require('./routes/users');
const reservationsRoute = require('./routes/reservations');
const authRoute = require('./routes/auth');
const resourcesRoute = require('./routes/resources');
var bodyParser = require('body-parser')
var cors = require('cors');
const { isAuthenticated } = require("./middlewares");


const server = express();
server.use(cors());

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.listen(3001, () => {
  console.log('Server is running on port 3001');
});

server.use('/uploads', express.static('uploads'))
server.use('/auth', authRoute);
server.use(isAuthenticated);
server.use('/users', usersRoute);
server.use('/reservations', reservationsRoute);
server.use('/resources', resourcesRoute);