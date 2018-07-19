import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { QuoteService } from './services/quote.service';
import { Quote } from './Quote';
import { Answer } from './Answer';
import { AnswerValues } from './AnswerValues';

@Component({
  selector: 'fn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  answerVal: AnswerValues;
  quote: Quote;

  constructor(private quoteService: QuoteService) {}

  ngOnInit() {
    this.getQuote();
  }

  getQuote() {
    this.quoteService
      .getQuote()
      .subscribe(
        (quote) => (this.quote = quote),
        (error: HttpErrorResponse) => console.error(error.message)
      );
  }

  onSubmit(event) {
    this.quoteService.answer(event.quoteId, event.answer).subscribe(
      (answerRes: Answer) => {
        console.log('Correct Answer', answerRes);
        this.answerVal = answerRes.answer;
      },
      (error: HttpErrorResponse) => console.error(error.message)
    );
  }
}
