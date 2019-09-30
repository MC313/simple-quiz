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

@Component({
  selector: 'fn-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss'],
  animations: [quoteCardAnimations.toggleOverlay]
})
export class QuoteCardComponent implements OnChanges, OnDestroy {
  answerVal: AnswerValues | null = null;
  disableBtn: boolean = false;

  @Input()
  set answer(val: AnswerValues) {
    this.answerVal = val;
  }

  get answer(): AnswerValues {
    return this.answerVal;
  }

  @Input() quote: Quote;
  @Output() answered: EventEmitter<object> = new EventEmitter();
  @Output() showingOverlay = new EventEmitter();

  constructor() { }

  ngOnChanges({ quote }: SimpleChanges) {
    console.log('change', quote)
    const { previousValue, currentValue } = quote;
    if (previousValue || currentValue['quoteId'] !== previousValue['quoteId']) {
      this.disableBtn = false;
    }
  }

  onOverlayComplete({ fromState }) {
    if (fromState === 'void' || fromState === 'show') return;
    this.showingOverlay.emit();
  }

  sumbitAnswer(quoteId: string, answer: boolean) {
    this.disableBtn = true;
    this.answered.emit({ quoteId, answer });
  }

  ngOnDestroy() { }
}
