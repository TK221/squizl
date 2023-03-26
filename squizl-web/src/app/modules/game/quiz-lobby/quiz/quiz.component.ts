import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameState } from 'src/app/shared/models/game-state.model';
import { QuestionModel } from 'src/app/shared/models/question.model';

@Component({
    selector: 'app-quiz-lobby-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
    @Input() question: QuestionModel;
    @Input() correctAnswer: number | null;
    @Input() gameState: GameState;
    @Output() answered = new EventEmitter<number>();
    @Output() nextQuestionEvent = new EventEmitter();
    @Input() selected: number | null;

    constructor () {
        this.question = new QuestionModel(0, '', ['', '', '', '']);
        this.correctAnswer = null;
        this.gameState = GameState.Lobby;
        this.selected = null;
    }

    answer (index: number) {
        if (this.gameState === GameState.Answering) {
            this.selected = index;
            this.answered.emit(index);
        }
    }

    nextQuestion () {
        if (this.gameState === GameState.Reveal) {
            this.nextQuestionEvent.emit();
        }
    }
}
