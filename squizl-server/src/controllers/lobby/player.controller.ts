import express from 'express';
import { areNotNullOrEmpty } from '../../helpers/body-checker.helper';
import { addPlayer, removePlayer } from '../../providers/quiz-lobby/player.provider';

const router = express.Router();

router.post('', (req, res) => {
    const { lobbyName } = req.body;
    if (areNotNullOrEmpty([lobbyName])) {
        const result = addPlayer(lobbyName, req.currUser.userId);

        if (result.isSucc()) res.status(200).send({ message: 'Player successfully added to lobby' });
        else res.status(result.value.httpStatus).send({ message: result.value.message });
    } else res.status(400).send({ message: 'Missing parameters in body' });
});

router.delete('/:lobbyName', (req, res) => {
    const lobbyName = req.params.lobbyName;

    const result = removePlayer(lobbyName, req.currUser.userId);

    if (result.isSucc()) res.status(200).send({ message: 'Player successfully added to lobby' });
    else res.status(result.value.httpStatus).send({ message: result.value.message });
});

export = router;
