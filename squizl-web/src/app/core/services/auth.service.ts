import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import * as moment from 'moment';
import { apiUrl } from '../../shared/config/http-request';
import { BehaviorSubject, throwError } from 'rxjs';
import { UserModel } from 'src/app/shared/models/user';
import { AccountModel } from 'src/app/shared/models/account.model';

class User {
    public token: string;
    public expiresIn: number;

    constructor (token: string, expiresIn: number) {
        this.token = token;
        this.expiresIn = expiresIn;
    }
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor (private http: HttpClient) {
        this.refreshUserAccount();
    }

    public readonly user$ = new BehaviorSubject<UserModel | null>(null);
    public readonly account$ = new BehaviorSubject<AccountModel | null>(null);

    login (username: string, password: string) {
        return this.http.post<User>(apiUrl + '/auth/login', { loginName: username, password: password })
            .pipe(
                catchError(err => err.code === 404 ? throwError('Login wrong') : throwError('Unknown Error')),
                tap(res => this.saveSession(res))
            );
    }

    register (loginName: string, displayName: string, password: string) {
        return this.http.post<User>(apiUrl + '/auth/register', { loginName: loginName, username: displayName, password: password });
    }

    logout (): void {
        localStorage.removeItem('token');
        localStorage.removeItem('token_exp');

        this.refreshUserAccount();
    }

    isLoggedIn (): boolean {
        const exp = this.getExpiration();

        if (exp && moment().isBefore(exp)) return true;
        return false;
    }

    getToken (): string | null {
        return localStorage.getItem('token');
    }

    getExpiration (): moment.Moment | null {
        const exp = localStorage.getItem('token_exp');

        if (exp) return moment(JSON.parse(exp));
        else return null;
    }

    private saveSession (res: User): void {
        const expiresAt = moment().add(res.expiresIn, 's');

        localStorage.setItem('token', res.token);
        localStorage.setItem('token_exp', JSON.stringify(expiresAt.valueOf()));

        this.refreshUserAccount();
    }

    private refreshUserAccount () {
        this.http.get<UserModel>(apiUrl + '/user').subscribe(
            user => { this.user$.next(user); },
            () => { this.user$.next(null); });
        this.http.get<AccountModel>(apiUrl + '/account').subscribe(
            acc => { this.account$.next(acc); },
            () => { this.account$.next(null); }
        );
    }
}
