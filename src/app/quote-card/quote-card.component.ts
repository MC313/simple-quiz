import {
  Component,
  OnChanges,
  Input,
  EventEmitter,
  Output,
  SimpleChanges
} from '@angular/core';

import { Quote } from '../Quote';
import { AnswerValues } from '../AnswerValues';
import { quoteCardAnimations } from './quote-card-animations';

type UserAnswer = { quoteId: string, answer: boolean };

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
  isRealBtnLoading: boolean = false;
  isFakeBtnLoading: boolean = false;
  overlayHeader: 'Correct Answer' | 'Incorrect Answer';
  overlayIcon: 'check_circle_outline' | 'highlight_off';
  overlayState: 'hide' | 'show' = 'hide';

  @Input() correctAnswer: boolean;
  @Input() quote: Quote;
  @Output() closingOverlay = new EventEmitter();
  @Output() userAnswer: EventEmitter<UserAnswer> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    // if(!this.quote) {
    //   this.disableBtn = true
    // }
  }

  ngOnChanges({ firstChange }: SimpleChanges) {
  	if (firstChange) return;
    this.handleAnswerChanges(this.correctAnswer);
  }

  handleAnswerChanges(correctAnswer: boolean) {
    this.isRealBtnLoading = false;
    this.isFakeBtnLoading = false;
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

  sumbitAnswer(quoteId: string, answer: boolean) {
    this.disableBtn = true;
    this.userAnswer.emit({ quoteId, answer });
  }

  onClosingOverlay({ fromState, toState }) {
    if (fromState === 'show' && toState === 'hide') {
      this.disableBtn = false;
      this.closingOverlay.emit();
    };
  };

}
