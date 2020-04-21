import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../models/quiz.model';
import {QuizService} from '../../services/quiz.service';
import {ThemeService} from '../../services/theme.service';
import {Theme} from '../../models/theme.model';


@Component({
  selector: 'app-selection-quiz',
  templateUrl: './selection-quiz.component.html',
  styleUrls: ['./selection-quiz.component.scss']
})
export class SelectionQuizComponent implements OnInit {
  public quizList: Quiz[];
  public state: number;
  public selectedQuiz: Quiz;
  public selectedTheme: Theme;

  constructor(public quizService: QuizService, public themeService: ThemeService) {
    this.quizService.quizzes$.subscribe((quiz) => this.quizList = quiz);
    this.state = 0;
    this.themeService.themeSelected$.subscribe((theme) => this.selectedTheme = theme);
  }


  ngOnInit() {
    console.log('Selection Quiz');
    console.log('Theme Selectionne dans Quiz : ');
    console.log(this.selectedTheme);
    console.log('Fin affichage selection Quiz');
  }
  JouerQuiz() {
    this.state = 1;
  }

  check() {
    console.log('Theme Selectionne dans Quiz : ');
    console.log(this.selectedTheme);
    console.log('champion');
    console.log('Fin affichage selection Quiz');
  }
}
