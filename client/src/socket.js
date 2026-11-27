import { io } from 'socket.io-client';

// Use the environment variable, or fallback to the current domain (since it's all on Vercel)
const URL = import.meta.env.VITE_API_URL || window.location.origin;

export const socket = io(URL, {
  // 1. MUST force websocket only for Vercel
  transports: ['websocket'], 
  
  // 2. MUST match the path we set in the backend
  path: '/api/socket/socket.io',
  
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000
});