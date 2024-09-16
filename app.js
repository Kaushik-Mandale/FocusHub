const socket = io();

// Elements
const sessionContainer = document.getElementById('session-container');
const sessionContent = document.getElementById('session-content');
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');

// Session creation
document.getElementById('createSessionBtn').addEventListener('click', () => {
    const sessionName = document.getElementById('sessionName').value;
    const password = document.getElementById('sessionPassword').value;

    socket.emit('createSession', sessionName, password);
});

socket.on('sessionCreated', (data) => {
    if (data.success) {
        sessionContainer.style.display = 'none';
        sessionContent.style.display = 'block';
    } else {
        alert(data.message);
    }
});

// Join session
document.getElementById('joinSessionBtn').addEventListener('click', () => {
    const sessionName = document.getElementById('joinSessionName').value;
    const password = document.getElementById('joinSessionPassword').value;

    socket.emit('joinSession', sessionName, password);
});

socket.on('joinedSession', (data) => {
    if (data.success) {
        sessionContainer.style.display = 'none';
        sessionContent.style.display = 'block';
    } else {
        alert(data.message);
    }
});

// Chat functionality
document.getElementById('sendChat').addEventListener('click', () => {
    const message = document.getElementById('chatInput').value;
    const sessionName = document.getElementById('joinSessionName').value || document.getElementById('sessionName').value;
    socket.emit('message', { sessionName, message });
});

socket.on('newMessage', (message) => {
    alert('New message: ' + message);
});

// Video and Audio handling (You can add WebRTC here later)
async function startCamera() {
    try {
        const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.srcObject = localStream;
    } catch (error) {
        console.error('Error accessing camera:', error);
    }
}

document.getElementById('toggleCamera').addEventListener('click', startCamera);
