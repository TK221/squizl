import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionHubRoutingModule } from './collection-hub-routing.module';
import { CollectionHubComponent } from './collection-hub.component';
import { FormsModule } from '@angular/forms';
import { AddCollectionComponent } from './add-collection/add-collection.component';

@NgModule({
    declarations: [
        CollectionHubComponent,
        AddCollectionComponent
    ],
    imports: [
        CommonModule,
        CollectionHubRoutingModule,
        FormsModule
    ]
})
export class CollectionHubModule { }
