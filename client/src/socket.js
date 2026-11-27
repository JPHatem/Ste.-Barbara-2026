import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_API_URL || window.location.origin;

export const socket = io(URL, {
  path: '/api/socket/socket.io', // Must match backend
  transports: ['websocket'],     // Vercel cannot do polling
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000
});