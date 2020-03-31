import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz.model';

@Component({
  selector: 'app-gestion-chose-quiz',
  templateUrl: './gestionChoseQuiz.component.html',
  styleUrls: ['./gestionChoseQuiz.component.scss']
})
export class GestionChoseQuizComponent implements OnInit {
  public quizList: Quiz[] = [];
  state: number;

  constructor(public quizService: QuizService) {
    this.quizService.quizzes$.subscribe((quiz) => this.quizList = quiz);
    this.state = 0;
  }

  ngOnInit() {
    console.log('menu chargé');
  }

  createQuiz() {
    this.state = 1;
  }

}
