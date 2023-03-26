import { CollectionModel } from './collection.model';
import { GameState } from './game-state.model';
import { PlayerModel } from './player.model';
import { QuestionModel } from './question.model';

export class QuizLobbyModel {
    public name: string;
    public players: Array<PlayerModel>;
    public question: QuestionModel | null;
    public gameState: GameState;
    public collection: CollectionModel;

    constructor (name: string, question: QuestionModel | null = null, collection: CollectionModel, players: Array<PlayerModel> = [], gameState = GameState.Answering) {
        this.name = name;
        this.players = players;
        this.question = question;
        this.gameState = gameState;
        this.collection = collection;
    }
}
