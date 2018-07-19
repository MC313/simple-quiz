import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Quote } from '../Quote';
import { AnswerValues } from '../AnswerValues';

@Component({
  selector: 'fn-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss']
})
export class QuoteCardComponent implements OnInit {
  @Input() answer: AnswerValues;
  @Input() quote: Quote;
  @Output() answered: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  sumbitAnswer(quoteId: string, answer: boolean) {
    const answerObj: object = {
      quoteId: quoteId,
      answer: answer
    };
    this.answered.emit(answerObj);
  }
}
