import { getRandomInt } from '../../helpers/general.helper';
import { QuestionModel } from '../../models/question.model';
import { fail, Result, success } from '../../models/result.model';
import { getLobbyByName } from '../quiz-lobby.provider';

export function nextQuestion (lobbyName: string): Result<QuestionModel | null> {
    const lobby = getLobbyByName(lobbyName);
    if (lobby.isFail()) return fail(lobby.value);

    if (lobby.value.collection.questions.length <= 0) return success(null);

    const questionIndex = getRandomInt(lobby.value.collection.questions.length);
    const newQuestion = lobby.value.collection.questions[questionIndex];

    lobby.value.question = newQuestion;

    lobby.value.collection.questions.splice(questionIndex, 1);

    return success(newQuestion);
}
