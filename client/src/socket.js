import { io } from "socket.io-client";

// Uses VITE_API_URL in production (set it in Vercel dashboard).
// Falls back to localhost in dev.
const URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:4000" : null);

if (!URL) {
  throw new Error(
    "VITE_API_URL is not set. Add it in Vercel → Settings → Environment Variables."
  );
}

export const socket = io(URL, {
  path: "/api/socket/socket.io",
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
});