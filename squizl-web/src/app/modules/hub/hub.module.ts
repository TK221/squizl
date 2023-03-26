import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HubRoutingModule } from './hub-routing.module';
import { HubComponent } from './hub.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        HubComponent
    ],
    imports: [
        CommonModule,
        HubRoutingModule,
        FormsModule
    ]
})
export class HubModule { }
