import { QuestionModel } from '../models/question.model';
import { QuizLobbyModel } from '../models/quiz-lobby.model';
import { HttpError } from '../models/http-error.model';
import { Result, fail, success } from '../models/result.model';
import { PlayerModel } from '../models/player.model';
import { GameState } from '../models/game-state.model';
import { getCollection } from './collection.provider';
import { getRandomInt } from '../helpers/general.helper';

const activeLobbies: Array<QuizLobbyModel> = [];

export async function createLobby (name: string, owner: number, collectionId: number): Promise<Result<QuizLobbyModel>> {
    const collectionRes = await getCollection(collectionId);
    if (collectionRes.isFail()) return fail(collectionRes.value);

    if (!activeLobbies.find(l => l.name === name)) activeLobbies.push(new QuizLobbyModel(name, new QuestionModel(0), collectionRes.value));
    else return fail(new HttpError('Lobby already exists', 409));

    const lobby = activeLobbies.find(l => l.name === name);
    if (lobby) {
        lobby.players.push(new PlayerModel(owner));

        const questionIndex = getRandomInt(lobby.collection.questions.length);
        const newQuestion = lobby.collection.questions[questionIndex];

        lobby.question = newQuestion;

        lobby.collection.questions.splice(questionIndex, 1);

        return success(lobby);
    } else return fail(new HttpError('Internal server error', 500));
}

export function removeLobby (lobbyName: string): Result<null> {
    const res = activeLobbies.splice(activeLobbies.findIndex(l => l.name === lobbyName), 1).length > 0;

    if (res) return success(null);
    else return fail(new HttpError('Lobby or it does not exist', 404));
}

export function getLobbyByName (name: string): Result<QuizLobbyModel> {
    const lobby = activeLobbies.find(l => l.name === name) || null;

    if (lobby) return success(lobby);
    else return fail(new HttpError('Lobby does not exist', 404));
}

export function getLobbyByPlayer (playerId: number): Result<QuizLobbyModel> {
    const res = activeLobbies.find(l => l.players.find(p => p.playerId === playerId)) || null;

    if (res) return success(res);
    else return fail(new HttpError('Lobby with this player does not exist', 404));
}

export function changeGameState (lobbyName: string, gameState: GameState): Result<null> {
    const result = getLobbyByName(lobbyName);

    if (result.isSucc()) {
        result.value.gameState = gameState;
        return success(null);
    } else return fail(result.value);
}
