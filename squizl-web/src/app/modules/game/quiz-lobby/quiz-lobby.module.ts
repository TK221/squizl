import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizLobbyRoutingModule } from './quiz-lobby-routing.module';
import { QuizLobbyComponent } from './quiz-lobby.component';
import { QuizComponent } from './quiz/quiz.component';

@NgModule({
    declarations: [
        QuizLobbyComponent,
        QuizComponent
    ],
    imports: [
        CommonModule,
        QuizLobbyRoutingModule
    ]
})
export class QuizLobbyModule { }
