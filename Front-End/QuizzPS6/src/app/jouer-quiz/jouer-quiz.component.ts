import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jouer-quiz',
  templateUrl: './jouer-quiz.component.html',
  styleUrls: ['./jouer-quiz.component.scss']
})
export class JouerQuizComponent implements OnInit {
  state: number;
  constructor() {
    this.state = 0;
   }

  ngOnInit() {
    console.log('Jouer Quiz chargement');
  }
  JouerQuiz() {
    this.state = 1;
  }

}
