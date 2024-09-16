const socket = io();

document.getElementById('createSessionButton').addEventListener('click', () => {
    const sessionName = document.getElementById('sessionNameInput').value;
    const password = document.getElementById('sessionPasswordInput').value;

    console.log('Creating session:', { sessionName, password });

    if (sessionName && password) {
        socket.emit('createSession', sessionName, password);
    } else {
        alert('Please enter both session name and password');
    }
});

document.getElementById('joinSessionButton').addEventListener('click', () => {
    const sessionName = document.getElementById('joinSessionNameInput').value;
    const password = document.getElementById('joinSessionPasswordInput').value;

    console.log('Joining session:', { sessionName, password });

    if (sessionName && password) {
        socket.emit('joinSession', sessionName, password);
    } else {
        alert('Please enter both session name and password');
    }
});

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

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});
