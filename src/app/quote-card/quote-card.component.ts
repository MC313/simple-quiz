import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  Input,
  EventEmitter,
  Output,
  HostBinding,
  HostListener,
  SimpleChanges
} from '@angular/core';

import { QuizItem } from '../QuizItem';
import { AnswerValues } from '../AnswerValues';
import { quoteCardAnimations } from './quote-card-animations';

type UserAnswer = { quizItemId: string, answer: boolean };

@Component({
  selector: 'fn-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss'],
  animations: [quoteCardAnimations.toggleOverlay]
})

export class QuoteCardComponent implements OnChanges {
  answerVal: AnswerValues | null = null;
  backgroundColor: 'green' | 'red';
  disableBtn: boolean = false;
  overlayHeader: 'Correct Answer' | 'Incorrect Answer';
  overlayIcon: 'check_circle_outline' | 'highlight_off';
  overlayState: 'hide' | 'show' = 'hide';

  @Input() correctAnswer: boolean;
  @Input() quizItem: QuizItem;
  @Output() userAnswer: EventEmitter<UserAnswer> = new EventEmitter();
  @Output() closingOverlay = new EventEmitter();

  constructor() { }

  ngOnChanges({ currentValue, firstChange }: SimpleChanges) {
  	if(firstChange) return;
  	console.log("Correct Answer: ", this.correctAnswer)
    this.handleAnswerChanges(this.correctAnswer);
  }

  handleAnswerChanges(correctAnswer: boolean) {
    this.onToggleOverlay();
    this.setOverlayHeaderValue(correctAnswer);
    this.setOverlayIconValue(correctAnswer);
    this.setOverlayBackground(correctAnswer);
  }

  onToggleOverlay() {
    this.overlayState = this.overlayState === 'hide' ? 'show' : 'hide';
  }

  setOverlayHeaderValue(correctAnswer: boolean) {
    if (correctAnswer) {
      this.overlayHeader = 'Correct Answer';
    } else {
      this.overlayHeader = 'Incorrect Answer';
    };
  }

  setOverlayIconValue(correctAnswer: boolean) {
    this.overlayIcon = correctAnswer ? 'check_circle_outline' : 'highlight_off';
  }

  setOverlayBackground(correctAnswer: boolean) {
    this.backgroundColor = correctAnswer ? 'green' : 'red';
  }

  sumbitAnswer(quizItemId: string, answer: boolean) {
    this.disableBtn = true;
    this.userAnswer.emit({ quizItemId, answer });
  }

  onClosingOverlay({ fromState, toState }) {
    if (fromState === 'show' && toState === 'hide') {
		this.disableBtn = false;
		this.closingOverlay.emit();
	};
  };

}
