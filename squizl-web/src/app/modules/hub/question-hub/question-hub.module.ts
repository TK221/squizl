import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionHubRoutingModule } from './question-hub-routing.module';
import { QuestionHubComponent } from './question-hub.component';
import { FormsModule } from '@angular/forms';
import { AddQuestionComponent } from './add-question/add-question.component';

@NgModule({
    declarations: [
        QuestionHubComponent,
        AddQuestionComponent
    ],
    imports: [
        CommonModule,
        QuestionHubRoutingModule,
        FormsModule
    ]
})
export class QuestionHubModule { }
