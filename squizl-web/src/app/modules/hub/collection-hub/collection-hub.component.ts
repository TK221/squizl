import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { apiUrl } from 'src/app/shared/config/http-request';
import { CollectionModel } from 'src/app/shared/models/collection.model';

@Component({
    selector: 'app-collection-hub',
    templateUrl: './collection-hub.component.html',
    styleUrls: ['./collection-hub.component.css']
})
export class CollectionHubComponent implements OnInit {
    collections: Array<CollectionModel>;
    showType: number;

    constructor (private http: HttpClient, private router: Router) {
        this.collections = [];
        this.showType = 0;
    }

    ngOnInit (): void {
        this.http.get<Array<CollectionModel>>(apiUrl + '/collection').subscribe(data => {
            this.collections = data;
        });
    }

    deleteCollection (collectionId: number) {
        const collectionIndex = this.collections.findIndex(c => c.id === collectionId);

        if (collectionIndex >= 0) {
            this.http.delete(apiUrl + '/collection/' + collectionId).subscribe(() => {
                this.collections.splice(collectionIndex, 1);
            });
        }
    }

    navigate (url: string): void {
        this.router.navigateByUrl(url);
    }
}
