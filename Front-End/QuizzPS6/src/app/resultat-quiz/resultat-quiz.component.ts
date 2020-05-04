import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-resultat-quiz',
  templateUrl: './resultat-quiz.component.html',
  styleUrls: ['./resultat-quiz.component.scss']
})
export class ResultatQuizComponent implements OnInit {
  @Input() score: number;
  public state: number;

  constructor() {
    console.log('RESULTAT QUIZ');
  }

  ngOnInit() {
  }

  recommencerQuiz() {
    this.state = 2;
  }

  choisirQuiz() {
    this.state = 3;
  }

}
