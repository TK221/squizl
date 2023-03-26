import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import api from './api';
import { init as lobbyInit } from './sockets/lobby.socket';
import { initSocketAuth } from './controllers/auth.controller';
import { ClientToServerEvents } from './config/socketio.config';

const app = express();

const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', api);

const server = createServer(app);
const io = new Server<ClientToServerEvents>(server, { cors: { methods: ['GET', 'POST'] } });
initSocketAuth(io);
lobbyInit(io);

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
