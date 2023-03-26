import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LobbyBrowserRoutingModule } from './lobby-browser-routing.module';
import { LobbyBrowserComponent } from './lobby-browser.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        LobbyBrowserComponent
    ],
    imports: [
        CommonModule,
        LobbyBrowserRoutingModule,
        FormsModule
    ]
})
export class LobbyBrowserModule { }
