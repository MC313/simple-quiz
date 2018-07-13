import { Component, OnInit } from '@angular/core';

import { QuoteService } from './services/quote.service';
import { Quote } from './Quote';

@Component({
  selector: 'fn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fn';
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
    this.quoteService
      .answer(event.quoteId, event.answer)
      .subscribe((answer) => {
        console.log('Correct Answer', answer);
        // this.correct
      });
  }
}
