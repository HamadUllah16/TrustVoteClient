import { io } from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_SOCKET, {
    reconnectionAttempts: 5,
    timeout: 10000,
    transports: ['websocket'],
});

export default socket;
