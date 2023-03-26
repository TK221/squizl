import { HttpError } from '../../models/http-error.model';
import { PlayerModel } from '../../models/player.model';
import { fail, Result, success } from '../../models/result.model';
import { getLobbyByName, getLobbyByPlayer } from '../quiz-lobby.provider';

export function addPlayer (lobbyName: string, playerId: number): Result<null> {
    const res = getLobbyByName(lobbyName);

    if (res.isFail()) return fail(res.value);

    else if (!res.value.players.find(p => p.playerId === playerId)) {
        res.value.players.push(new PlayerModel(playerId));

        return success(null);
    } else return fail(new HttpError('Player is already in the lobby', 200));
}

export function removePlayer (lobbyName: string, playerId: number): Result<null> {
    const res = getLobbyByName(lobbyName);

    if (res.isFail()) return fail(res.value);

    const playerIndex = res.value.players.findIndex(p => p.playerId === playerId);
    if (playerIndex >= 0) {
        res.value.players.splice(playerIndex, 1);

        return success(null);
    } else return fail(new HttpError('Player is not in the lobby', 404));
}

export function getPlayer (playerId: number): Result<PlayerModel> {
    const res = getLobbyByPlayer(playerId);

    if (res.isFail()) return fail(res.value);

    const player = res.value.players.find(p => p.playerId === playerId) || null;
    if (player) return success(player);
    else return fail(new HttpError('Player is not in a active lobby', 404));
}

export function setAnswerOfPlayer (playerId: number, answer: number): Result<null> {
    const res = getPlayer(playerId);

    if (res.isFail()) return fail(res.value);
    else {
        res.value.answer = answer;
        return success(null);
    }
}

export function clearAllAnswers (lobbyName: string): Result<null> {
    const res = getLobbyByName(lobbyName);

    if (res.isFail()) return fail(res.value);
    else {
        res.value.players.forEach(p => { p.answer = null; });
        return success(null);
    }
}

export function allPlayersAnswered (lobbyName: string): Result<boolean> {
    const res = getLobbyByName(lobbyName);

    if (res.isFail()) return fail(res.value);
    else return success(res.value.players.find(p => !p.answer) === undefined);
}
