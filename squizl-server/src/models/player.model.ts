export class PlayerModel {
    playerId: number;
    answer: number | null;

    constructor (playerId: number, answer = null) {
        this.playerId = playerId;
        this.answer = answer;
    }
}
