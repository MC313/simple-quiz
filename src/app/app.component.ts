import { Component, OnInit } from '@angular/core';

import { QuoteService } from './services/quote.service';
import { Quote } from './Quote';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'fn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  correct: object;
  quote: Quote;

  constructor(private quoteService: QuoteService) {}

  ngOnInit() {
    this.getQuote();
  }

  getQuote() {
    this.quoteService.getQuote().subscribe((quote) => {
      this.quote = quote;
    });
  }

  onSubmit(event) {
    this.quoteService.answer(event.quoteId, event.answer).subscribe(
      (correctRes) => {
        console.log('Correct Answer', correctRes);
        this.correct = correctRes;
      },
      (error: HttpErrorResponse) => console.error(error.message)
    );
  }
}
