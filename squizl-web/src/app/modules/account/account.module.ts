import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
    declarations: [
        AccountComponent,
        LoginComponent,
        RegisterComponent,
        ProfileComponent
    ],
    imports: [
        CommonModule,
        AccountRoutingModule,
        FormsModule
    ]
})
export class AccountModule { }
