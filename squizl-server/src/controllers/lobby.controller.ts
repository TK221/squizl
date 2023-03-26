import express from 'express';
import { areNotNullOrEmpty, areNumbers } from '../helpers/body-checker.helper';
import { isOwner } from '../providers/collection.provider';
import { getLobbyByPlayer, createLobby, removeLobby, getLobbyByName } from '../providers/quiz-lobby.provider';
import playerRouter from './lobby/player.controller';

const router = express.Router();

router.use('/player', playerRouter);

router.get('', (req, res) => {
    const lobby = getLobbyByPlayer(req.currUser.userId);

    if (lobby) res.status(200).send(lobby);
    else res.status(404).send();
});

router.post('', async (req, res) => {
    const { lobbyName, collectionId } = req.body;

    if (!areNotNullOrEmpty([lobbyName]) || !areNumbers([collectionId])) return res.status(400).send({ message: 'Missing parameters in body' });

    const ownerRes = await isOwner(collectionId, req.currUser.userId);
    if (ownerRes.isFail()) return res.status(ownerRes.value.httpStatus).send(ownerRes.value.message);

    const lobby = await createLobby(lobbyName, req.currUser.userId, collectionId);

    if (lobby.isSucc()) res.status(201).send({ message: 'Lobby created successfully' });
    else res.status(lobby.value.httpStatus).send(lobby.value.message);
});

router.delete('/:lobbyName', (req, res) => {
    if (!areNotNullOrEmpty([req.params.lobbyName])) return res.status(400).send({ message: 'Missing parameters' });

    const lobbyRes = getLobbyByName(req.params.lobbyName);
    if (lobbyRes.isFail()) return res.status(lobbyRes.value.httpStatus).send(lobbyRes.value.message);
    if (!lobbyRes.value.players.find(p => p.playerId === req.currUser.userId)) return res.status(403).send('User is not in the lobby');

    const result = removeLobby(req.params.lobbyName);

    if (result.isSucc()) res.status(200).send({ message: 'Lobby deleted successfully' });
    else res.status(result.value.httpStatus).send(result.value.message);
});

export = router;
