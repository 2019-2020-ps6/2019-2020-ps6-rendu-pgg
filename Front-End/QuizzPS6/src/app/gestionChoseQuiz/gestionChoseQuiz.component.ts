import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-chose-quiz',
  templateUrl: './gestionChoseQuiz.component.html',
  styleUrls: ['./gestionChoseQuiz.component.scss']
})
export class GestionChoseQuizComponent implements OnInit {
  state: number;

  constructor() {
    this.state = 0;
  }

  ngOnInit() {
    console.log('menu chargé');
  }

  createQuiz() {
    this.state = 1;
  }

}
