import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { QuoteService } from '../services/quote.service';
import { Quote } from '../Quote';

@Component({
  selector: 'fn-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss']
})
export class QuoteCardComponent implements OnInit {
  @Input() quote: Quote;
  @Output() answered: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit() {
    console.log('quote 2', this.quote);
  }

  sumbitAnswer(quoteId: string, answer: boolean) {
    const answerObj: object = {
      quoteId: quoteId,
      answer: answer
    };
    this.answered.emit(answerObj);
  }
}
