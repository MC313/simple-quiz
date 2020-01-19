import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import API from '@aws-amplify/api';

import { QuizItem } from './QuizItem';
import { Answer } from './Answer';
import { AnswerValues } from './AnswerValues';

@Component({
  selector: 'fn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  answer: AnswerValues;
  quizItem: QuizItem;
  topics: string[];
  topicsBool: boolean = false;

  constructor() { }

  ngOnInit() {
    this.getQuizItem();
  }

 getQuizItem() {
    API.get("QuizGameAPI", "/quizitem", {})
    	.then(({ body: quizItem }) => this.quizItem = quizItem)
    	.catch((error) => console.error("Error getting quote", error));
  }

/*
  onSubmit({ quizItemId, answer }) {
    this.quoteService
      .answer(quizItemId, answer)
      .subscribe(
        ({ answer }: Answer) => (this.answer = answer),
        (error: HttpErrorResponse) => console.error(error.message)
      );
  }
*/

  resetCard() {
    this.quizItem = null;
    setTimeout(() => {
      //this.answer = null;
      this.getQuizItem();
    }, 6000);
  }




}
