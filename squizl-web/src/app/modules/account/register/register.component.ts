import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    loginName: string = '';
    displayName: string = '';
    password: string = '';
    confirmPassword: string = '';
    wrongInputs: boolean = false;

    constructor (private authService: AuthService, private router: Router) { }

    register () {
        if (this.loginName && this.displayName && this.password && this.password === this.confirmPassword) {
            this.authService.register(this.loginName, this.displayName, this.password).subscribe(() => {
                this.router.navigateByUrl('/login');
            }, () => { this.wrongInputs = true; });
        } else this.wrongInputs = true;
    }

    navigate (url: string) {
        this.router.navigateByUrl(url);
    }
}
