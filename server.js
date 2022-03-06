const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
require('dotenv').config()
require('./config/database')

const app = express();
const http = require('http')


app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));


// Put API routes here, before the "catch all" route
app.use('/api/projects', require('./routes/api/projects.js'))
app.use('/api/users', require('./routes/api/users.js'))


// The following "catch all" route to return the index.html on all non-AJAX requests
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

const server = app.listen(port, function() {
    console.log(`Express app running on port ${port}`)
});

const { Server } = require("socket.io")
const io = new Server(server)

io.on('connection', (socket) => {
    console.log('a user connected')
})

