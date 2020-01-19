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
  toggleOverlay: 'hide' | 'show' = 'hide';

  @Input() correctAnswer: AnswerValues;
  @Input() quizItem: QuizItem;
  @Output() userAnswer: EventEmitter<UserAnswer> = new EventEmitter();
  @Output() showingOverlay = new EventEmitter();

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    const { correctAnswer , quote } = changes;
    this.handleAnswerChanges(correctAnswer);
  }

  handleAnswerChanges({ currentValue = null }: { currentValue: AnswerValues }) {
    this.setOverlayValue(currentValue);
    this.setOverlayHeaderValue(currentValue);
    this.setOverlayIconValue(currentValue);
    this.setOverlayBackground(currentValue);
  }

  setOverlayValue(answer: AnswerValues) {
    this.toggleOverlay = answer ? 'show' : 'hide';
  }

  setOverlayHeaderValue(answer: AnswerValues) {
    if (answer === 'INCORRECT') {
      this.overlayHeader = 'Incorrect Answer';
    } else {
      this.overlayHeader = 'Correct Answer';
    };
  }

  setOverlayIconValue(answer: AnswerValues) {
    this.overlayIcon = answer === 'CORRECT' ? 'check_circle_outline' : 'highlight_off';
  }

  setOverlayBackground(answer: AnswerValues) {
    this.backgroundColor = answer === 'CORRECT' ? 'green' : 'red';
  }

  sumbitAnswer(quizItemId: string, answer: boolean) {
    //this.disableBtn = true;
    this.userAnswer.emit({ quizItemId, answer });
  }

  onOverlayComplete({ fromState }) {
    if (fromState === 'void' || fromState === 'show') return;
    this.showingOverlay.emit();
  }

}
