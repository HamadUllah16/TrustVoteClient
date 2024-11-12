import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
    reconnectionAttempts: 5,
    timeout: 10000,
    transports: ['websocket'], // Ensure connection stability
});

export default socket;
