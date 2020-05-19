import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { UserService } from 'src/services/user.service';
import { Theme } from '../../models/theme.model';
import { User } from 'src/models/user.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {QuizService} from '../../services/quiz.service';
import {Quiz} from '../../models/quiz.model';

@Component({
  selector: 'app-selection-theme',
  templateUrl: './selection-theme.component.html',
  styleUrls: [ './selection-theme.component.scss' ]
})
export class SelectionThemeComponent implements OnInit {
  public filteredThemes: Theme[] = [];
  public themeList: Theme[] = [];
  public quizList: Quiz[];
  public state: number;
  public currentTheme: Theme;
  public start = 0;
  public end = 4;
  public buttonText = 'Choisissez un thème';
  public selectedUser: User;

  constructor(public themeService: ThemeService, public userService: UserService, private snackBar: MatSnackBar,
              public quizService: QuizService) {
    this.quizService.quizzes$.subscribe((quiz) => {
      this.quizList = quiz;
    });
    this.themeService.themes$.subscribe((theme) => {
      this.themeList = theme;
      setTimeout(() => {
        if (theme) {
          this.initThemeNumberOfQuestions();
          this.filterThemes();
        } }, 100);
    });
    this.themeService.themeSelected$.subscribe((theme) => (this.currentTheme = theme));
    this.userService.userSelected$.subscribe((user) => {
      this.selectedUser = user;
    });
    this.state = 0;
  }

  ngOnInit() {
    // 1. fetch theme list
    // 2. assign theme list fetched into themeList
    console.log('Selection theme : ');
    setTimeout(() => {this.initThemeNumberOfQuestions(); }, 100);
    console.log('Fin init');
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {duration: 1000});
  }

  selectionnerTheme(themeId: string) {
    console.log('Theme selectionne !');
    console.log(themeId);
    // console.log('Patate');
    this.themeService.setSelectedTheme(themeId);
    // console.log(themeId.toString());
    // console.log(this.currentTheme);
    // console.log('fin selection theme !');
    // this.themeService.themeSelected$.subscribe((theme) => this.currentTheme = theme);
    // console.log(this.currentTheme);
    this.state = 2;
    this.buttonText = 'Valider';
    setTimeout(() => {const userPop = 'Thème ' + this.currentTheme.name + ' sélectionné';
                      this.openSnackBar(userPop, 'Ok'); }, 200);
  }

  validerTheme() {
    console.log('Theme Valide !');
    console.log(this.currentTheme);
    if (this.state === 2) {
      console.log('theme valide');
      this.state = 1;
    } else {
      console.log('NUL');
      this.openSnackBar('Veuillez sélectionner un thème avant de valider !', 'Ok');
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

  goToSelectionUser() {
    this.state = 5 ;
  }
  initThemeNumberOfQuestions() {
    // console.log('In Init theme Number of Questions');
    for (const themeI of this.themeList) {
      // console.log('Testing hihi');
      themeI.numberofquestions = this.quizService.countThemeQuiz(themeI);
    }
  }

  filterThemes() {
    if (this.themeList === undefined || this.quizList === undefined) {
      console.log('Liste de Quiz non instanciee');
    } else {
      console.log('Avant testFilter');
      console.log(this.filteredThemes);
      this.filteredThemes = this.themeList.filter(theme => (theme.numberofquestions > 0));
      console.log('Apres testFilter');
      console.log(this.filteredThemes);
      console.log('Fin de methode testFilter');
    }
  }
}
