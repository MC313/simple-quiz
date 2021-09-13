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
  answer: boolean;
  error: string = null;
  quizItem: QuizItem;
  topics: string[];
  topicsBool: boolean = false;

  constructor() { }

  ngOnInit() {
    this.getQuizItem();
  }

 getQuizItem() {
    API.get("QuizGameAPI", "/quotes", {})
    	.then(({ body: quizItem }) => this.quizItem = quizItem)
    	.catch(({ message }: HttpErrorResponse) => {
        	console.error("Error getting quote. Error:", message);
        	this.error = "An error has occured please reload the page and try again.";
			setTimeout(() => { this.error = null }, 10000);   
	 });
  }


  onSubmit(requestParams) {
    API.post("QuizGameAPI", "/answer", requestParams)
      .then(({ body }) => this.answer = body.isCorrectAnswer)
      .catch(({ message }: HttpErrorResponse) => {
        	console.error("Error submitting answer. Error:", message);
        	this.error = "An error has occured please reload the page and try again.";
        	setTimeout(() => { this.error = null }, 10000);
	   });
  }


  resetCard() {
    this.quizItem = null;
    setTimeout(() => {
      //this.answer = null;
      this.getQuizItem();
    }, 6000);
  }

/*
  function handleError({ message }: HttpErrorResponse) {
  	console.error(`${userText}. Error: ${message}`);
  	this.error = "An error has occured please reload the page and try again.";
  };
*/

}
