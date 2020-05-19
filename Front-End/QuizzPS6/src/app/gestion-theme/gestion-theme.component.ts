import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Theme } from '../../models/theme.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import {QuizService} from '../../services/quiz.service';
import {Quiz} from '../../models/quiz.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-gestion-theme',
  templateUrl: './gestion-theme.component.html',
  styleUrls: ['./gestion-theme.component.scss']
})
export class GestionThemeComponent implements OnInit {
  public quizList: Quiz[] = [];
  public themeList: Theme[] = [];
  public currentTheme: Theme;
  state: number;

  public themeForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public themeService: ThemeService, public quizService: QuizService,
              private snackBar: MatSnackBar) {
    this.themeService.themes$.subscribe((user) => this.themeList = user);
    this.quizService.quizzes$.subscribe((quiz) => this.quizList = quiz);

    this.themeForm = this.formBuilder.group({
      name: [''],
    });

    this.themeService.themes$.subscribe((quiz) => this.themeList = quiz);

    this.state = 0;
  }

  ngOnInit() {
    console.log('menu theme chargé');
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {duration: 2000});
  }

  selectTheme(theme: Theme) {
    this.state = 1;
    this.currentTheme = theme;
    this.themeService.setSelectedTheme(theme.id);
    setTimeout(() => {const themePop = 'Theme ' + theme.name + ' sélectionné !';
                      this.openSnackBar(themePop, 'Ok'); }, 100);
  }

  createTheme() {
    const themeToCreate: Theme = this.themeForm.getRawValue() as Theme;
    // Do you need to log your object here in your class? Uncomment the code below
    // and open your console in your browser by pressing F12 and choose the tab "Console".
    // You will see your quiz object when you click on the create button.
    console.log('Created Theme :', themeToCreate);

    // Now, add your quiz in the list!
    this.themeService.createTheme(themeToCreate);
    if (themeToCreate.name !== '') {
      setTimeout(() => {const themePop = 'Theme ' + themeToCreate.name + ' créé';
                        this.openSnackBar(themePop, 'Ok'); }, 100);
    } else {
      this.openSnackBar('Veuillez renseigner un nom de thème à créer ! ', 'Ok');
    }
  }

  deleteTheme(theme: Theme) {
    // tslint:disable-next-line:no-shadowed-variable

    this.state = 0;
    this.themeService.deleteTheme(theme);
    setTimeout(() => {const themePop = 'Theme ' + theme.name + ' supprimé !';
                      this.openSnackBar(themePop, 'Ok'); }, 100);
  }

  ThemeOption(theme: Theme) {
    console.log(theme);
    this.state = 4;
  }
}

