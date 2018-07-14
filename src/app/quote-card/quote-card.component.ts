import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  AfterViewInit
} from '@angular/core';

import { Quote } from '../Quote';

@Component({
  selector: 'fn-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss']
})
export class QuoteCardComponent implements OnInit, AfterViewInit {
  @Input() correct: object = {};
  @Input() quote: Quote;
  @Output() answered: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    console.log('correct', this.correct);
  }

  sumbitAnswer(quoteId: string, answer: boolean) {
    const answerObj: object = {
      quoteId: quoteId,
      answer: answer
    };
    this.answered.emit(answerObj);
  }
}
