import express from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv';
import { Server } from 'socket.io';
import { areNotNullOrEmpty } from '../helpers/body-checker.helper';
import { verifyAccount, createAccount } from '../providers/account.provider';
import { createUser } from '../providers/user.provider';

export const router = express.Router();
const secret = process.env.JWT_SECRET || 'secret';
const expiration = isNaN(Number(process.env.JWT_EXPIRATION)) ? 43200 : Number(process.env.JWT_EXPIRATION);

export function initSocketAuth (io: Server) {
    io.use(function (socket, next) {
        if (socket.handshake.query && socket.handshake.query.token && typeof socket.handshake.query.token === 'string') {
            jwt.verify(socket.handshake.query.token, secret, function (err, decoded) {
                if (err) return next(new Error('Authentication error'));
                socket.data.decoded = decoded;
                next();
            });
        } else {
            next(new Error('Authentication error'));
        }
    });
}

router.post('/login', async (req, res) => {
    const { loginName, password } = req.body;

    if (areNotNullOrEmpty([loginName, password])) {
        const result = await verifyAccount(loginName, password);

        if (result.isFail()) return res.status(result.value.httpStatus).send(result.value.message);

        const token = jwt.sign({ foo: 'bar', userId: result.value.id }, secret, { algorithm: 'HS256', expiresIn: expiration });

        res.status(200).json({ token: token, expiresIn: expiration });
    } else res.status(400).send({ message: 'Missing loginName or password' });
});

router.post('/register', async (req, res) => {
    const { loginName, username, password } = req.body;

    if (areNotNullOrEmpty([loginName, username, password])) {
        const accRes = await createAccount(loginName, password);

        if (accRes.isFail()) return res.status(accRes.value.httpStatus).send(accRes.value.message);

        const userRes = await createUser(accRes.value.id, username);

        if (userRes.isSucc()) res.status(201).send({ message: 'Register completed' });
        else res.status(userRes.value.httpStatus).send(userRes.value.message);
    } else res.status(400).send({ message: 'Missing username or password' });
});
