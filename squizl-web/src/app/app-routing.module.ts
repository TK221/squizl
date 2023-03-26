import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { ErrorComponent } from './shared/components/error/error.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
    { path: 'game', loadChildren: () => import('./modules/game/game.module').then(m => m.GameModule), canActivate: [AuthGuard] },
    { path: '', loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule) },
    { path: 'hub', loadChildren: () => import('./modules/hub/hub.module').then(m => m.HubModule), canActivate: [AuthGuard] },
    { path: 'error/:errorCode/:errorMessage', component: ErrorComponent },
    { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
