import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { apiUrl } from 'src/app/shared/config/http-request';
import { CollectionModel } from 'src/app/shared/models/collection.model';

@Component({
    selector: 'app-add-question',
    templateUrl: './add-question.component.html',
    styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
    readonly MAX_ANSWERS = 10;
    collections: Array<CollectionModel>;
    question: string;
    answers: Array<string>;
    correctAnswerIndex: number;
    wrongInputs: boolean;

    constructor (private http: HttpClient, private router: Router) {
        this.collections = [];
        this.question = '';
        this.answers = ['', ''];
        this.correctAnswerIndex = 0;
        this.wrongInputs = false;
    }

    ngOnInit (): void {
        this.http.get<Array<CollectionModel>>(apiUrl + '/collection').subscribe(data => { this.collections = data; });
    }

    addAnswerOption () {
        if (this.answers.length < this.MAX_ANSWERS) this.answers.push('');
    }

    removeAnswersOption () {
        if (this.answers.length > 2) this.answers.pop();
    }

    addAnswer (another: boolean) {
        const answersFilled = this.answers.find(a => a === '') === undefined;

        if (this.answers.length <= this.MAX_ANSWERS && this.answers.length >= 2 && this.question &&
            this.correctAnswerIndex >= 0 && this.correctAnswerIndex < this.answers.length && answersFilled) {
            this.http.post(apiUrl + '/question', { question: this.question, answers: this.answers, correctAnswer: this.correctAnswerIndex }).subscribe(() => {
                if (another) {
                    this.question = '';
                    this.answers = ['', ''];
                    this.correctAnswerIndex = 0;
                    this.wrongInputs = false;
                } else this.router.navigateByUrl('hub/question');
            });
        } else this.wrongInputs = true;
    }

    trackByFn (index: any, item: any) {
        return index;
    }
}
