import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://chat-application-xi-nine.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'https://chat-application-xi-nine.vercel.app'],
        methods: ['GET', 'POST'],
        credentials: true,
    }
});

const userSocketMap = {}; // { userId -> socketId }

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id;
        console.log(`User Connected: ${userId} -> ${socket.id}`);
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        if (userId) {
            delete userSocketMap[us]()
