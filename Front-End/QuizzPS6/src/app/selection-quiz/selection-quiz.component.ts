import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../models/quiz.model';
import {QuizService} from '../../services/quiz.service';
import {ThemeService} from '../../services/theme.service';
import {Theme} from '../../models/theme.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../../services/user.service';


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
  public end = 3;
  private color: string;

  constructor(public quizService: QuizService, public themeService: ThemeService, private snackBar: MatSnackBar) {
    this.quizService.quizzes$.subscribe((quiz) => {
      this.quizList = quiz;
      if (quiz) {
        if (this.selectedTheme) {
           this.filterQuizzes();
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
        this.filterQuizzes();
      }
    }
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {duration: 1000});
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
    setTimeout(() => {const userPop = 'Thème ' + this.selectedQuiz.name + ' sélectionné';
                      this.openSnackBar(userPop, 'Ok'); }, 100);
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
      this.openSnackBar('Veuillez sélectionner un quiz avant de valider !', 'Ok');
    }
  }

  viewNext() {
    this.start = this.start + 3;
    this.end = this.start + 3;
  }
  viewPrevious() {
    this.start = this.start - 3;
    this.end = this.end - 3;
  }

  filterQuizzes() {
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

  goToSelectionTheme() {
    this.state = 5;
  }

}
