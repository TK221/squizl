import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-hub',
    templateUrl: './hub.component.html',
    styleUrls: ['./hub.component.css']
})
export class HubComponent implements OnInit {
    constructor (private router: Router) { }

    ngOnInit (): void {
    }

    navigate (url: string) {
        this.router.navigateByUrl(url);
    }
}
