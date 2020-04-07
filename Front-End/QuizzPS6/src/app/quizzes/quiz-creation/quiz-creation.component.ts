import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-creation',
  templateUrl: './quiz-creation.component.html',
  styleUrls: ['./quiz-creation.component.scss']
})
export class QuizCreationComponent implements OnInit {
  state: number;
  constructor() { }

  ngOnInit() {
  }
  ajouterQuiz() {
    this.state = 1;
  }


}
