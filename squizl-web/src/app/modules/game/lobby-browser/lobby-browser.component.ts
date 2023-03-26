import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LobbyService } from 'src/app/core/services/lobby.service';
import { apiUrl } from 'src/app/shared/config/http-request';
import { CollectionModel } from 'src/app/shared/models/collection.model';

@Component({
    selector: 'app-lobby-browser',
    templateUrl: './lobby-browser.component.html',
    styleUrls: ['./lobby-browser.component.css']
})
export class LobbyBrowserComponent implements OnInit {
    collections: Array<CollectionModel>;
    selectedCollectionId: number;
    createLobbyName: string = '';
    joinLobbyName: string = '';

    constructor (private lobbyService: LobbyService, private router: Router, private http: HttpClient) {
        this.selectedCollectionId = 0;
        this.collections = [];
    }

    ngOnInit (): void {
        this.http.get<Array<CollectionModel>>(apiUrl + '/collection').subscribe(data => { data.map(col => col.questions.length > 0); this.collections = data; });
    }

    createLobby () {
        if (this.createLobbyName && this.selectedCollectionId !== 0) {
            this.lobbyService.createLobby(this.createLobbyName, this.selectedCollectionId).subscribe(() => {
                this.router.navigateByUrl('/game/lobby');
            });
        }
    }

    joinLobby () {
        if (this.joinLobbyName) {
            this.lobbyService.joinLobby(this.joinLobbyName).subscribe(() => {
                this.router.navigateByUrl('/game/lobby');
            });
        }
    }
}
