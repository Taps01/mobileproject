import { Component, OnInit } from '@angular/core';
import { Questions } from '../../questions';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  questions: Questions[] = [];
  activeQuestion: Questions;
  questionCounter: number;
  nbrOfQuestions: number;
  valueCounter: number;
  info: boolean;

  constructor() {}
  
  // handling questions from json file and reseting visibility of info div
  ngOnInit() {
    fetch('./assets/data/selection.json').then(res => res.json())
    .then(json => {
      this.info = false;
      this.valueCounter = 0;
      this.questions = json;
      this.questionCounter = 0;
      this.setQuestion();
      this.nbrOfQuestions = this.questions.length;
    });
  }

  // set the right question based on questionCounter
  setQuestion() {
    if (this.questionCounter === this.questions.length) {
      // affects to the visibility of info div
     this.info = true;
    }
    this.activeQuestion = this.questions[this.questionCounter];
    this.questionCounter++;
  }

  // check the answer option
  checkOption(option: number, activeQuestion: Questions, e) {
    // event is for checking if the checkbox was selected or not, used to decrease the valueCounter in question 7
    if ( e.currentTarget.checked === true ) {
      this.valueCounter = this.valueCounter - parseInt(activeQuestion.options[option].value);
    } else {
      this.valueCounter = this.valueCounter + parseInt(activeQuestion.options[option].value);
    }
    // keep the same question active if the condition is met
    if ( this.questionCounter >= 7 ) {
    } else 
    {
      this.setQuestion();
    }
  }
}