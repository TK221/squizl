import { QuestionModel } from './question.model';

export class CollectionModel {
    id: number;
    name: string;
    ownerId: number;
    questions: Array<QuestionModel>;

    constructor (id: number, name: string, ownerId: number, questions: Array<QuestionModel> = []) {
        this.id = id;
        this.name = name;
        this.ownerId = ownerId;
        this.questions = questions;
    }
}
