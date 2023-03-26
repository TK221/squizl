import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game.component';

const routes: Routes = [
    { path: '', component: GameComponent },
    { path: 'lobby', loadChildren: () => import('./quiz-lobby/quiz-lobby.module').then(m => m.QuizLobbyModule) },
    { path: 'browser', loadChildren: () => import('./lobby-browser/lobby-browser.module').then(m => m.LobbyBrowserModule) }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GameRoutingModule { }
