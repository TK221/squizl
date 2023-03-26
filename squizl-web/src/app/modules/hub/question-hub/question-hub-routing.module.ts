import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuestionComponent } from './add-question/add-question.component';
import { QuestionHubComponent } from './question-hub.component';

const routes: Routes = [
    { path: '', component: QuestionHubComponent },
    { path: 'add', component: AddQuestionComponent }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuestionHubRoutingModule { }
