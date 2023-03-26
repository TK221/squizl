import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { apiUrl } from 'src/app/shared/config/http-request';

@Component({
    selector: 'app-add-collection',
    templateUrl: './add-collection.component.html',
    styleUrls: ['./add-collection.component.css']
})
export class AddCollectionComponent {
    name: string;
    wrongInputs: boolean;

    constructor (private http: HttpClient, private router: Router) {
        this.name = '';
        this.wrongInputs = false;
    }

    addCollection (another: boolean) {
        this.http.post(apiUrl + '/collection', { name: this.name }).subscribe(() => {
            if (another) {
                this.name = '';
                this.wrongInputs = false;
            } else this.router.navigateByUrl('hub/collection');
        });
    }

    navigate (url: string): void {
        this.router.navigateByUrl(url);
    }
}
