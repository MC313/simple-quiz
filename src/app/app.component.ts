import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import API from '@aws-amplify/api';

import { Quote } from './Quote';

@Component({
  selector: 'fn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  answer: boolean;
  error: string = null;
  quote:  Quote;
  score: number = 0;
  topics: string[];

  constructor() { }

  ngOnInit() {
    this.getQuote();
  }

 getQuote() {
    API.get("QuizGameAPI", "/quotes", {})
    	.then((response) => this.quote = response)
    	.catch(({ message }: HttpErrorResponse) => {
        	console.error("Error getting quote. Error:", message);
        	this.error = "An error has occured please reload the page and try again.";
			setTimeout(() => { this.error = null }, 10000);   
	 });
  }


  onSubmit(requestParams) {
    console.log("on submit........")
    API.post("QuizGameAPI", "/answer", { body: requestParams })
      .then(({ isCorrectAnswer }) => {
        this.answer = isCorrectAnswer
        this.updateScore(this.answer)
      })
      .catch(({ message }: HttpErrorResponse) => {
        	console.error("Error submitting answer. Error:", message);
        	this.error = "An error has occured please reload the page and try again.";
        	setTimeout(() => { this.error = null }, 10000);
	   });
  }

  updateScore(answer: boolean) {
    answer === true && this.score++;
  }


  resetCard() {
    this.quote = null;
    setTimeout(() => {
      this.getQuote();
    }, 6000);
  }
}
