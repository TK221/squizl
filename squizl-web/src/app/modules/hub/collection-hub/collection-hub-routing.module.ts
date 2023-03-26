import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCollectionComponent } from './add-collection/add-collection.component';
import { CollectionHubComponent } from './collection-hub.component';

const routes: Routes = [
    { path: '', component: CollectionHubComponent },
    { path: 'add', component: AddCollectionComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CollectionHubRoutingModule { }
