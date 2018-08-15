import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { QuoteService } from './services/quote.service';
import { Quote } from './Quote';
import { Answer } from './Answer';
import { AnswerValues } from './AnswerValues';
import { TopicsService } from './services/topics.service';

@Component({
  selector: 'fn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  answerVal: AnswerValues;
  topics: string[];
  topicsBool: boolean = false;
  quote: Quote;

  constructor(
    private quoteService: QuoteService,
    private topicsService: TopicsService
  ) {}

  ngOnInit() {
    this.getQuote();
    this.getTopics();
  }

  getQuote() {
    this.quoteService.getQuote().subscribe(
      (quote) => {
        this.quote = quote;
        console.log('Quote', this.quote);
      },
      (error: HttpErrorResponse) => console.error(error.message)
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
    this.quoteService.answer(event.quoteId, event.answer).subscribe(
      (answerRes: Answer) => {
        this.answerVal = answerRes.answer;
        setTimeout(() => {
          this.getQuote();
        }, 5000);
      },
      (error: HttpErrorResponse) => console.error(error.message)
    );
  }

  toggleTopics() {
    this.topicsBool = !this.topicsBool;
  }
}
