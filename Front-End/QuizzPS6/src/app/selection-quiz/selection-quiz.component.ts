import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selection-quiz',
  templateUrl: './selection-quiz.component.html',
  styleUrls: ['./selection-quiz.component.scss']
})
export class SelectionQuizComponent implements OnInit {
  state: number;
  constructor() {
    this.state = 0;
}

  ngOnInit() {
  }
  JouerQuiz() {
    this.state = 1;
  }
}
