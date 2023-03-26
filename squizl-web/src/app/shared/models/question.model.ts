export class QuestionModel {
    id: number;
    question: string;
    answers: Array<string>;

    constructor (id: number, question: string, answers: Array<string>) {
        this.id = id;
        this.question = question;
        this.answers = answers;
    }
}
