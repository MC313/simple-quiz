import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  Input,
  EventEmitter,
  Output,
  HostBinding,
  SimpleChanges
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

import { Quote } from '../Quote';
import { AnswerValues } from '../AnswerValues';
import { quoteCardAnimations } from './quote-card-animations';

// type AnimationState = 'slideIn' | 'slideOut';

@Component({
  selector: 'fn-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss'],
  animations: [
    quoteCardAnimations.slideCardOut,
    quoteCardAnimations.slideCardInOut,
    quoteCardAnimations.slideCardUp
  ]
})
export class QuoteCardComponent implements OnInit, OnChanges, OnDestroy {
  @HostBinding('@slideCardInOut')
  animationState: 'slideIn' | 'slideOut' = 'slideIn';
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

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('Changes', changes);
    if (changes.answer) {
      this.answerVal = changes.answer.currentValue;
      this._animateCardState(
        changes.answer.currentValue,
        changes.answer.previousValue
      );
    }
  }

  ngOnInit() {}

  sumbitAnswer(quoteId: string, answer: boolean) {
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
    console.log('Component being destroyed');
  }
}
