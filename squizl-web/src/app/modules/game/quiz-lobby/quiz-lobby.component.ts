import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { io, Socket } from 'socket.io-client';
import { AuthService } from 'src/app/core/services/auth.service';
import { baseUrl } from 'src/app/shared/config/http-request';
import { GameState } from 'src/app/shared/models/game-state.model';
import { QuestionModel } from 'src/app/shared/models/question.model';
import { QuizLobbyModel } from 'src/app/shared/models/quiz-lobby.model';

@Component({
    selector: 'app-quiz-lobby',
    templateUrl: './quiz-lobby.component.html',
    styleUrls: ['./quiz-lobby.component.css']
})
export class QuizLobbyComponent {
    private socket: Socket;

    lobby: QuizLobbyModel;
    question: QuestionModel;
    correctAnswer: number | null;
    players: Array<number | null>;
    gameState: GameState;
    selectedAnswer: number | null;

    constructor (private router: Router, private authService: AuthService) {
        this.lobby = new QuizLobbyModel('');
        this.question = new QuestionModel(0, '', ['', '', '', '']);
        this.correctAnswer = null;
        this.players = [];
        this.gameState = GameState.Answering;
        this.selectedAnswer = null;

        const token = this.authService.getToken();

        this.socket = io(baseUrl, { query: { token: (token || '') } });
        this.socket.on('disconnect', () => {
            this.router.navigateByUrl('/game/browser');
        });

        this.socket.on('connect', () => {
            this.socket.send('connected');
        });

        this.socket.on('init', (data) => {
            this.lobby = data.lobby;
            this.players = data.players;
            this.question = data.question;
        });

        this.socket.on('playersUpdate', (players: Array<number>) => {
            this.players = players;
        });

        this.socket.on('nextQuestion', (question: QuestionModel) => {
            this.question = question;
            this.correctAnswer = null;
            this.selectedAnswer = null;
            this.gameState = GameState.Answering;
        });

        this.socket.on('reveal', (correctAnswer: number) => {
            this.correctAnswer = correctAnswer;
            this.gameState = GameState.Reveal;
        });
    }

    answer (answerIndex: number) {
        this.socket.emit('answer', { answer: answerIndex });
        this.selectedAnswer = answerIndex;
    }

    nextQuestion () {
        this.socket.emit('nextQuestion');
    }
}
