import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username: string = '';
    password: string = '';
    authenticationFailed: boolean = false;

    constructor (private authService: AuthService, private router: Router) { }

    login () {
        this.authService.login(this.username, this.password).subscribe(user => {
            if (user) this.router.navigateByUrl('/');
        }, () => { this.authenticationFailed = true; });
    }

    navigate (url: string) {
        this.router.navigateByUrl(url);
    }
}
