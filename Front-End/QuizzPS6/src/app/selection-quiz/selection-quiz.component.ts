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
  public filteredQuizzes: Quiz[] = [];
  public state: number;
  public selectedQuiz: Quiz;
  public selectedTheme: Theme;
  public start = 0;
  public end = 4;

  constructor(public quizService: QuizService, public themeService: ThemeService) {
    this.quizService.quizzes$.subscribe((quiz) => this.quizList = quiz);
    this.themeService.themeSelected$.subscribe((theme) => this.selectedTheme = theme);
    this.quizService.quizSelected$.subscribe((quiz) => this.selectedQuiz = quiz);
    this.state = 0;
    this.filterQuiz();
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
    console.log('Quiz a choisir : ');
    console.log(this.quizList);
    console.log('Fin quiz a choisir');
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

  viewNext() {
    this.start = this.start + 4;
    this.end = this.start + 4;
  }
  viewPrevious() {
    this.start = this.start - 4;
    this.end = this.end - 4;
  }

  filterQuiz() {
    this.filteredQuizzes = [];
    if (this.quizList === undefined) {
      console.log('OLALALA BAH DIS DONC');
    } else {
      console.log('TestFront');
      console.log(this.quizList);
      if (this.quizList.length > 0) {
        for ( const quizItem of this.quizList ) {
          console.log('TestFor');
          console.log(quizItem.themeId.toString());
          console.log(this.selectedTheme.id);
          if (quizItem.questions.length > 0 ) {
            console.log('Plus d 1 question');
            if ( quizItem.themeId.toString() === this.selectedTheme.id.toString() ) {
              console.log('TestIf');
              console.log(quizItem);
              this.filteredQuizzes.push(quizItem);
            }
          }
        }
      }
    }
    console.log('Les quizz filtres');
    console.log(this.filteredQuizzes);
  }

  coucou() {
    console.log('coucou');
  }

}
