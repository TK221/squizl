import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    constructor (private router: Router) {}

    intercept (request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error) => {
                if (error instanceof HttpErrorResponse) {
                    if ((error.error instanceof ErrorEvent) === false) {
                        if ((error.status >= 500 && error.status < 600) || error.status === 0) this.router.navigateByUrl(`error/${error.status}/${error.statusText}`);
                        else {
                            switch (error.status) {
                            case 401:
                                this.router.navigateByUrl('/login');
                                break;
                            case 403:
                                this.router.navigateByUrl('/unauthorized');
                                break;
                            }
                        }
                    }
                }
                return throwError(error);
            })
        );
    }
}
