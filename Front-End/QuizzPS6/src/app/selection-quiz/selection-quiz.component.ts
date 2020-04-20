import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../models/quiz.model';
import {QuizService} from '../../services/quiz.service';
import {Theme} from '../../models/theme.model';


@Component({
  selector: 'app-selection-quiz',
  templateUrl: './selection-quiz.component.html',
  styleUrls: ['./selection-quiz.component.scss']
})
export class SelectionQuizComponent implements OnInit {
  public quizList: Quiz[] = [];
  public state: number;
  public selectedQuiz: Quiz;
  public selectedTheme: Theme;
  public selectedThemeId: number;

  constructor(public quizService: QuizService) {
    this.quizService.quizzes$.subscribe((quiz) => this.quizList = quiz);
    this.state = 0;
    // this.selectedThemeId = selectedTheme.id;
    this.selectedThemeId = 1;
  }


  ngOnInit() {}
  JouerQuiz() {
    this.state = 1;
  }
}
