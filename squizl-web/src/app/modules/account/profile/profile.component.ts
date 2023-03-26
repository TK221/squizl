import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
    loginName: string;
    username: string;

    constructor (private authService: AuthService) {
        this.loginName = '';
        this.username = '';

        this.authService.user$.subscribe(user => {
            this.username = user?.username || '';
        });
        this.authService.account$.subscribe(account => {
            this.loginName = account?.name || '';
        });
    }
}
