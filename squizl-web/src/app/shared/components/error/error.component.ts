import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
    errorMessage: string ;
    errorCode: string;

    constructor (private route: ActivatedRoute) {
        this.errorCode = '';
        this.errorMessage = '';
    }

    ngOnInit (): void {
        this.route.paramMap.subscribe(params => {
            this.errorCode = params.get('errorCode') || 'Unknown error';
            this.errorMessage = params.get('errorMessage') || 'Unknown error';
        });
    }
}
