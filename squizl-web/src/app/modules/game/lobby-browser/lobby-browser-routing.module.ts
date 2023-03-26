import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyBrowserComponent } from './lobby-browser.component';

const routes: Routes = [{ path: '', component: LobbyBrowserComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LobbyBrowserRoutingModule { }
