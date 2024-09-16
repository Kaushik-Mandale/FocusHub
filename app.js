// Initialize the socket connection to the server
const socket = io();

// Handling session creation
document.getElementById('createSessionButton').addEventListener('click', () => {
    const sessionName = document.getElementById('sessionNameInput').value;
    const password = document.getElementById('sessionPasswordInput').value;

    if (sessionName && password) {
        socket.emit('createSession', sessionName, password);
    } else {
        alert('Please enter both session name and password');
    }
});

// Handling session joining
document.getElementById('joinSessionButton').addEventListener('click', () => {
    const sessionName = document.getElementById('joinSessionNameInput').value;
    const password = document.getElementById('joinSessionPasswordInput').value;

    if (sessionName && password) {
        socket.emit('joinSession', sessionName, password);
    } else {
        alert('Please enter both session name and password');
    }
});

// Listening for the session creation response
socket.on('sessionCreated', (response) => {
    if (response.success) {
        alert('Session created successfully!');
    } else {
        alert('Failed to create session: ' + response.message);
    }
});

// Listening for the session joining response
socket.on('joinedSession', (response) => {
    if (response.success) {
        alert('Joined session successfully!');
    } else {
        alert('Failed to join session: ' + response.message);
    }
});

// Listening for new chat messages (if chat feature is enabled)
socket.on('newMessage', (message) => {
    console.log('New message received: ' + message);
});
