import { Component, OnInit } from '@angular/core';
import { NewQuiz } from '../../../models/quiz.model';

@Component({
  selector: 'app-quiz-creation',
  templateUrl: './quiz-creation.component.html',
  styleUrls: ['./quiz-creation.component.scss']
})
export class QuizCreationComponent implements OnInit {
  state: number;
  quizObject: NewQuiz;
  selectedTheme: any;
  themeList: any = [
    {
      id: 1,
      name: 'theme1'
    },
    {
      id: 2,
      name: 'theme2'
    }
  ];
  // 1. Setup a quizz object and get values from textboxe,etc to it
  constructor() {

   }

   ngOnInit() {
    this.quizObject = {};
    }
  ajouterQuiz() {
    console.log('selected theme:', this.selectedTheme);
    console.log('quiz:', this.quizObject);
    this.state = 1;
  }


}
