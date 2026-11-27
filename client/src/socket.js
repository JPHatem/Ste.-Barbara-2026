import { io } from "socket.io-client";

const URL = import.meta.env.VITE_API_URL || window.location.origin;

export const socket = io(URL, {
  // 1. THIS MUST MATCH YOUR BACKEND EXACTLY
  path: "/api/socket/socket.io", 
  
  // 2. Vercel requires forcing websocket
  transports: ["websocket"], 
  
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000
});