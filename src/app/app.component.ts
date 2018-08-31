import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
  OnInit
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { QuoteService } from './services/quote.service';
import { TopicsService } from './services/topics.service';
import { QuoteCardComponent } from './quote-card/quote-card.component';
import { Quote } from './Quote';
import { Answer } from './Answer';
import { AnswerValues } from './AnswerValues';

@Component({
  selector: 'fn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('quoteCardContainer', { read: ViewContainerRef })
  entry: ViewContainerRef;
  answerVal: AnswerValues;
  componentRef: any;
  quote: Quote;
  topics: string[];
  topicsBool: boolean = false;

  constructor(
    private quoteService: QuoteService,
    private resolver: ComponentFactoryResolver,
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
        this._createComponent(this.quote);
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
    this.quoteService
      .answer(event.quoteId, event.answer)
      .subscribe(
        (answerRes: Answer) => (this.answerVal = answerRes.answer),
        (error: HttpErrorResponse) => console.error(error.message)
      );
  }

  toggleTopics() {
    this.topicsBool = !this.topicsBool;
  }

  destroyComp() {
    this.componentRef.destroy();
  }

  private _createComponent(quote: Quote) {
    this.entry.clear();
    const factory = this.resolver.resolveComponentFactory(QuoteCardComponent);
    this.componentRef = this.entry.createComponent(factory);
    this.componentRef.instance.quote = quote;
  }
}
