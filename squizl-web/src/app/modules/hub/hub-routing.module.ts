import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HubComponent } from './hub.component';

const routes: Routes = [
    { path: '', component: HubComponent },
    { path: 'question', loadChildren: () => import('./question-hub/question-hub.module').then(m => m.QuestionHubModule) },
    { path: 'collection', loadChildren: () => import('./collection-hub/collection-hub.module').then(m => m.CollectionHubModule) }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HubRoutingModule { }
