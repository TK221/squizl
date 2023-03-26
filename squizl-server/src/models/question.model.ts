export class QuestionModel {
    id: number;
    question: string;
    answers: Array<string>;
    correctAnswer: number | null;

    constructor (id: number, question = '', answers: Array<string> = ['', '', '', ''], correctAnswer = 0) {
        this.id = id;
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }
}
