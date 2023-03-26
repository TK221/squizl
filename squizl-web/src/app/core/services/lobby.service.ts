import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { apiUrl } from 'src/app/shared/config/http-request';

@Injectable({
    providedIn: 'root'
})
export class LobbyService {
    constructor (private http: HttpClient, private router: Router) {

    }

    createLobby (name: string, collectionId: number) {
        return this.http.post(apiUrl + '/lobby', { lobbyName: name, collectionId: collectionId });
    }

    joinLobby (lobbyName: string) {
        return this.http.post(apiUrl + '/lobby/player', { lobbyName: lobbyName });
    }

    deleteLobby () {
        return this.http.delete(apiUrl + '/lobby');
    }
}
