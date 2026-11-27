import { io } from "socket.io-client";

// If VITE_API_URL is not set, this will use the live Vercel URL!
const URL = import.meta.env.VITE_API_URL || window.location.origin;

export const socket = io(URL, {
  path: "/api/socket/socket.io", 
  transports: ["websocket"], 
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000
});