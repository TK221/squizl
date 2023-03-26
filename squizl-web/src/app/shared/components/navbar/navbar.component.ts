import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserModel } from '../../models/user';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    user: UserModel | null;

    constructor (private router: Router, public authService: AuthService) {
        this.user = null;
        authService.user$.subscribe(user => { this.user = user; });
    }

    route (route: string) {
        this.router.navigateByUrl(route);
    }

    logout () {
        this.authService.logout();
        this.route('');
    }
}
