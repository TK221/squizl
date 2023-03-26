import { Server } from 'socket.io';
import { allPlayersAnswered, clearAllAnswers, setAnswerOfPlayer } from '../providers/quiz-lobby/player.provider';
import { changeGameState, getLobbyByPlayer } from '../providers/quiz-lobby.provider';
import { GameState } from '../models/game-state.model';
import { nextQuestion } from '../providers/quiz-lobby/collection.provider';

export function init (io: Server) {
    io.on('connection', socket => {
        if (!socket.data.decoded?.userId) return socket.disconnect();
        const playerId: number = socket.data.decoded.userId;

        const lobbyRes = getLobbyByPlayer(playerId);

        if (lobbyRes.isSucc()) socket.join(lobbyRes.value.name);
        else return socket.disconnect();
        const lobbyName = lobbyRes.value.name;

        socket.emit('init', {
            lobby: { name: lobbyRes.value.name },
            players: lobbyRes.value.players.map(player => player.playerId),
            question: { id: lobbyRes.value.question?.id, question: lobbyRes.value.question?.question, answers: lobbyRes.value.question?.answers }
        });
        if (lobbyRes.value.gameState === GameState.Reveal) socket.emit('reveal', lobbyRes.value.question?.correctAnswer);
        socket.to(lobbyName).emit('playerUpdate', { players: lobbyRes.value.players.map(player => player.playerId) });

        socket.on('answer', (answer: number) => {
            const lobbyRes = getLobbyByPlayer(playerId);

            if (lobbyRes.isSucc() && lobbyRes.value.gameState === GameState.Answering) {
                const setAnswerRes = setAnswerOfPlayer(playerId, answer);
                const answeredRes = allPlayersAnswered(lobbyName);

                if (setAnswerRes.isSucc() && answeredRes.isSucc() && answeredRes.value && lobbyRes.isSucc()) {
                    changeGameState(lobbyName, GameState.Reveal);
                    socket.to(lobbyName).emit('reveal', lobbyRes.value.question?.correctAnswer);
                    socket.emit('reveal', lobbyRes.value.question?.correctAnswer);
                }
            }
        });

        socket.on('nextQuestion', () => {
            const lobbyRes = getLobbyByPlayer(playerId);

            if (lobbyRes.isSucc() && lobbyRes.value.gameState === GameState.Reveal) {
                const res = nextQuestion(lobbyName);

                if (res.isSucc() && res.value) {
                    const { id, question, answers } = res.value;
                    socket.emit('nextQuestion', { id: id, question: question, answers: answers });
                    socket.to(lobbyName).emit('nextQuestion', { id: id, question: question, answers: answers });
                    clearAllAnswers(lobbyName);
                    changeGameState(lobbyName, GameState.Answering);
                }
            }
        });
    });
}
