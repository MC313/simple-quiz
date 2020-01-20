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
  error: string = null;
  quizItem: QuizItem;
  topics: string[];
  topicsBool: boolean = false;

  constructor() { }

  ngOnInit() {
    this.getQuizItem();
  }

 getQuizItem() {
  	const headers = {"Access-Control-Allow-Origin": "*"};
    API.get("QuizGameAPI", "/quizitem", { headers })
    	.then(({ body: quizItem }) => this.quizItem = quizItem)
    	.catch(({ message }: HttpErrorResponse) => {
        	console.error("Error getting quiz item. Error:", message);
        	this.error = "An error has occured please reload the page and try again.";
	    });
  }

/*
  onSubmit({ quizItemId, answer }) {
  	const body = { quizItemId, answer };
  	const headers = { "access-control-allow-origin": "*" };
    API.post("QuizGameAPI", "/quizitem", { body, headers })
      .then({ body: answer }: Answer) => this.answer = answer)
      .catch(({ message }: HttpErrorResponse) => {
        	console.error("Error submitting answer. Error:", message);
        	this.error = "An error has occured please reload the page and try again.";
	   });
  }
*/

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
