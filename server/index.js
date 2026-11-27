const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);

// 1. Configure Socket.IO for Vercel
const io = new Server(server, {
  path: '/api/socket/socket.io',
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  },
  maxHttpBufferSize: 1e8
});

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// ---------- In-memory data store ----------
let children = [];
let currentChild = null;

// ---------- REST API ----------

app.get('/api/health', (req, res) => {
  res.json({ ok: true, children: children.length, currentChild: currentChild?.name || null });
});

app.get('/api/children', (req, res) => res.json(children));

app.post('/api/children', (req, res) => {
  const { name, category, description, theme, animation, imageUrl } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }
  const child = {
    id: Date.now().toString(),
    name: name.trim(),
    category: category || '',
    description: description || '',
    theme: theme || 'classic',
    animation: animation || 'fade',
    imageUrl: imageUrl || ''
  };
  children.push(child);
  io.emit('children:updated', children);
  res.json(child);
});

app.put('/api/children/:id', (req, res) => {
  const idx = children.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  children[idx] = { ...children[idx], ...req.body, id: children[idx].id };
  io.emit('children:updated', children);
  res.json(children[idx]);
});

app.delete('/api/children/:id', (req, res) => {
  children = children.filter(c => c.id !== req.params.id);
  io.emit('children:updated', children);
  res.json({ ok: true });
});

app.post('/api/reorder', (req, res) => {
  const { order } = req.body;
  children.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  io.emit('children:updated', children);
  res.json({ ok: true });
});

// ---------- Socket.IO real-time ----------
io.on('connection', (socket) => {
  socket.emit('children:updated', children);
  socket.emit('stage:current', currentChild);

  socket.on('stage:show', (child) => {
    currentChild = child;
    io.emit('stage:show', child);
  });

  socket.on('stage:clear', () => {
    currentChild = null;
    io.emit('stage:clear');
  });

  socket.on('stage:transition', (data) => {
    io.emit('stage:transition', data);
  });

  socket.on('stage:requestState', () => {
    socket.emit('stage:current', currentChild);
  });
});

// ---------- SERVE FRONTEND (CRUCIAL FOR VERCEL) ----------
// This tells Express to serve your React app from the client/dist folder
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// THIS IS THE CRUCIAL VERCEL EXPORT (Must use module.exports)
module.exports = server;