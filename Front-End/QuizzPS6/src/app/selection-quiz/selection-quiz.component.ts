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
    this.themeService.themeSelected$.subscribe((theme) => this.selectedTheme = theme);
    this.quizService.quizSelected$.subscribe((quiz) => this.selectedQuiz = quiz);
    this.state = 0;
  }


  ngOnInit() {
    console.log('New one');
    console.log('Selection Quiz');
    console.log('Theme Selectionne dans Quiz : ');
    console.log(this.selectedTheme);
    console.log('Fin affichage selection Quiz');
  }

  selectionnerQuiz(quizId: string) {
    console.log('Quiz selectionne !');
    console.log(quizId);
    // console.log('Patate');
    this.quizService.setSelectedQuiz(quizId);
    // console.log(themeId.toString());
    // console.log(this.currentTheme);
    // console.log('fin selection theme !');
    // this.themeService.themeSelected$.subscribe((theme) => this.currentTheme = theme);
    // console.log(this.currentTheme);
    this.state = 2;
  }

  check() {
    console.log('Theme Selectionne dans Quiz : ');
    console.log(this.selectedTheme);
    console.log('champion');
    console.log('Fin affichage selection Quiz');
  }

  validerQuiz() {
    console.log(this.selectedQuiz);
    if (this.state === 2) {
      console.log('Quiz valide');
      this.state = 1;
    } else {
      console.log('NUL');
    }
  }
}
