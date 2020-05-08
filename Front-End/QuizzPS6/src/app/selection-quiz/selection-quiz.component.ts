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
    this.quizService.quizzes$.subscribe((quiz) => {
      this.quizList = quiz;
      if (quiz) {
        if (this.selectedTheme) {
           this.testFilter();
           console.log('CONSTRUCTEUR INIT ABONNEMENT');
        }
      }
    });
    this.themeService.themeSelected$.subscribe((theme) => this.selectedTheme = theme);
    this.quizService.quizSelected$.subscribe((quiz) => this.selectedQuiz = quiz);
    this.state = 0;
    // this.testFilter();
  }


  ngOnInit() {
    console.log('New one');
    console.log('Selection Quiz');
    console.log('Theme Selectionne dans Quiz : ');
    console.log(this.selectedTheme);
    console.log('Fin affichage selection Quiz');
    if (this.quizList) {
      if (this.selectedTheme) {
        this.testFilter();
      }
    }
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

  testFilter() {
    if (this.quizList === undefined) {
      console.log('Liste de Quiz non instanciee');
    } else {
      console.log('Avant testFilter');
      console.log(this.filteredQuizzes);
      this.filteredQuizzes = this.quizList.filter(quiz => (quiz.themeId.toString() === this.selectedTheme.id.toString())
        && (quiz.questions.length > 0));
      console.log('Apres testFilter');
      console.log(this.filteredQuizzes);
      console.log('Fin de methode testFilter');
    }
  }
}
