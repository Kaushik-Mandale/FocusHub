const socket = io();

// Create session event
document.getElementById('createSessionButton').addEventListener('click', () => {
    const sessionName = document.getElementById('sessionNameInput').value;
    const password = document.getElementById('sessionPasswordInput').value;

    if (sessionName && password) {
        console.log('Emitting createSession event');
        socket.emit('createSession', sessionName, password);
    } else {
        alert('Please enter both session name and password');
    }
});

// Join session event
document.getElementById('joinSessionButton').addEventListener('click', () => {
    const sessionName = document.getElementById('joinSessionNameInput').value;
    const password = document.getElementById('joinSessionPasswordInput').value;

    if (sessionName && password) {
        console.log('Emitting joinSession event');
        socket.emit('joinSession', sessionName, password);
    } else {
        alert('Please enter both session name and password');
    }
});

// Handling responses
socket.on('sessionCreated', (response) => {
    console.log('Received sessionCreated response:', response);
    if (response.success) {
        alert('Session created successfully!');
    } else {
        alert('Failed to create session: ' + response.message);
    }
});

socket.on('joinedSession', (response) => {
    console.log('Received joinedSession response:', response);
    if (response.success) {
        alert('Joined session successfully!');
    } else {
        alert('Failed to join session: ' + response.message);
    }
});
