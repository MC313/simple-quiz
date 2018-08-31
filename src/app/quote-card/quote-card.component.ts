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

import { Quote } from '../Quote';
import { AnswerValues } from '../AnswerValues';
import { quoteCardAnimations } from './quote-card-animations';

type AnimationState = 'slideIn' | 'slideOut';

@Component({
  selector: 'fn-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss'],
  animations: [quoteCardAnimations.slideCardInOut]
})
export class QuoteCardComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  set answer(val: AnswerValues) {
    this.answerVal = val;
  }
  @Input()
  quote: Quote;
  @Output()
  answered: EventEmitter<object> = new EventEmitter();
  @Output()
  newQuote: EventEmitter<boolean> = new EventEmitter();
  answerVal: any;
  @HostBinding('@slideCardInOut')
  animationState: AnimationState = 'slideIn';
  @HostListener('@slideCardInOut.done', ['$event.target'])
  animationDone(event) {
    console.log('Animation DONE', event);
  }

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {}

  ngOnInit() {
    console.log('running on init function');
  }

  sumbitAnswer(quoteId: string, answer: boolean) {
    this.animationState = 'slideOut';
    const answerObj: object = {
      quoteId,
      answer
    };
    this.answered.emit(answerObj);
  }

  private _animateCardState(currentCardVal, previousCardVal) {
    if (currentCardVal !== previousCardVal) {
      this.animationState = 'slideIn';
    }
  }

  ngOnDestroy() {
    this.animationState = 'slideOut';
    console.log('Component being destroyed');
  }
}
