import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizLobbyComponent } from './quiz-lobby.component';

const routes: Routes = [{ path: '', component: QuizLobbyComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuizLobbyRoutingModule { }
