import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { apiUrl } from 'src/app/shared/config/http-request';
import { CollectionModel } from 'src/app/shared/models/collection.model';
import { QuestionModel } from 'src/app/shared/models/question.model';

@Component({
    selector: 'app-question-hub',
    templateUrl: './question-hub.component.html',
    styleUrls: ['./question-hub.component.css']
})
export class QuestionHubComponent implements OnInit {
    collections: Array<CollectionModel>;
    questions: Array<QuestionModel>;
    selectedCollectionId: number;

    constructor (private http: HttpClient, private router: Router) {
        this.selectedCollectionId = 0;
        this.collections = [];
        this.questions = [];
    }

    ngOnInit (): void {
        this.http.get<Array<QuestionModel>>(apiUrl + '/question').subscribe(data => { this.questions = data; });
        this.http.get<Array<CollectionModel>>(apiUrl + '/collection').subscribe(data => { this.collections = data; });
    }

    isInCollection (questionId: number): boolean {
        return this.collections.findIndex(col => col.questions.find(q => q.id === questionId)) >= 0;
    }

    addToCollection (question: QuestionModel) {
        const collectionIndex = this.collections.findIndex(c => c.id === this.selectedCollectionId);

        if (collectionIndex >= 0) {
            const collection = this.collections[collectionIndex];

            this.http.post<CollectionModel>(apiUrl + '/collection/question/' + collection.id, { questionId: question.id }).subscribe(data => {
                this.collections[collectionIndex] = data;
            });
        }
    }

    removeFromCollection (question: QuestionModel) {
        const collectionIndex = this.collections.findIndex(c => c.id === this.selectedCollectionId);

        if (collectionIndex >= 0) {
            const collection = this.collections[collectionIndex];
            const questionIndexInCollection = collection.questions.findIndex(q => q.id === question.id);

            if (questionIndexInCollection >= 0) {
                this.http.delete<CollectionModel>(`${apiUrl}/collection/question/${collection.id}/${question.id}`).subscribe(() => {
                    this.collections[collectionIndex].questions.splice(questionIndexInCollection, 1);
                });
            }
        }
    }

    navigate (url: string) {
        this.router.navigateByUrl(url);
    }
}
