const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let sessions = {};  // To store sessions and their passwords

app.use(express.static(path.join(__dirname)));

io.on('connection', (socket) => {
    console.log('New user connected');

    // Create session with password
    socket.on('createSession', (sessionName, password) => {
        console.log('Received createSession request:', { sessionName, password });
        if (!sessions[sessionName]) {
            sessions[sessionName] = password;
            socket.join(sessionName);
            socket.emit('sessionCreated', { success: true });
        } else {
            socket.emit('sessionCreated', { success: false, message: 'Session name already taken' });
        }
    });

    // Join session
    socket.on('joinSession', (sessionName, password) => {
        console.log('Received joinSession request:', { sessionName, password });
        if (sessions[sessionName] && sessions[sessionName] === password) {
            socket.join(sessionName);
            socket.emit('joinedSession', { success: true });
        } else {
            socket.emit('joinedSession', { success: false, message: 'Invalid session name or password' });
        }
    });

    // Handle chat messages
    socket.on('message', (data) => {
        console.log('Received message:', data);
        io.to(data.sessionName).emit('newMessage', data.message);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
