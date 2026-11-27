import { io } from "socket.io-client";

const URL = import.meta.env.VITE_API_URL || window.location.origin;

export const socket = io(URL, {
  path: "/socket.io", // Must match the Vercel route
  transports: ["websocket"], // Vercel cannot do polling
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000
});
