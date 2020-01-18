import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { QuoteService } from './services/quote.service';
import { TopicsService } from './services/topics.service';
import { Quote } from './Quote';
import { Answer } from './Answer';
import { AnswerValues } from './AnswerValues';

@Component({
  selector: 'fn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  answer: AnswerValues;
  quote: Quote;
  topics: string[];
  topicsBool: boolean = false;

  constructor(
    private quoteService: QuoteService,
    private topicsService: TopicsService
  ) { }

  ngOnInit() {
    this.getQuote();
    this.getTopics();
  }

  getQuote() {
    this.quoteService.getQuote().subscribe(
      (quote) => this.quote = quote,
      (error: HttpErrorResponse) => console.error(error.message),
    );
  }

  getTopics() {
    this.topicsService
      .getTopics()
      .subscribe(
        (topics: string[]) => (this.topics = topics),
        (error: HttpErrorResponse) => console.error(error.message)
      );
  }

  getQuoteByTopic(topic: string) {
    this.quoteService
      .getQuote(topic)
      .subscribe(
        (quote: Quote) => (this.quote = quote),
        (error: HttpErrorResponse) => console.error(error.message)
      );
  }

  onSubmit(event) {
    this.quoteService
      .answer(event.quoteId, event.answer)
      .subscribe(
        ({ answer }: Answer) => (this.answer = answer),
        (error: HttpErrorResponse) => console.error(error.message)
      );
  }

  resetCard() {
    this.quote = null;
    setTimeout(() => {
      //this.answer = null;
      this.getQuote();
    }, 6000);
  }

  toggleTopics() {
    this.topicsBool = !this.topicsBool;
  }
}
