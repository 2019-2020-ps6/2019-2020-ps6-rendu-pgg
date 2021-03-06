import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Theme} from '../../models/theme.model';
import {ThemeService} from '../../services/theme.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-gestion-chose-quiz',
  templateUrl: './gestionChoseQuiz.component.html',
  styleUrls: ['./gestionChoseQuiz.component.scss']
})
export class GestionChoseQuizComponent implements OnInit {
  public quizList: Quiz[] = [];
  currentQuiz: Quiz;
  state: number;
  public quizForm: FormGroup;
  themeList: Theme[] = [];
  deleteState: number;
  public newthemeForm: FormGroup;


  constructor(public formBuilder: FormBuilder, public quizService: QuizService, public themeService: ThemeService,
              private snackBar: MatSnackBar) {
    this.quizService.quizzes$.subscribe((quiz) => this.quizList = quiz);
    this.state = 0;
    this.deleteState = 0;
    this.themeService.themes$.subscribe((theme) => this.themeList = theme);

    this.newthemeForm = this.formBuilder.group({
      name: [''],
    });

    this.quizForm = this.formBuilder.group({
      name: [''],
      date: new Date(Date.now()),
      theme: [],
    });
  }

  ngOnInit() {
    console.log('menu chargé gestion quiz');
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {duration: 2000});
  }

  createQuiz() {
    this.state = 1;
    this.deleteState = 0;
  }

  selectQuiz(quiz: Quiz) {
    this.currentQuiz = quiz;
    this.quizService.setSelectedQuiz(this.currentQuiz.id);
    this.deleteState = 0;
    setTimeout(() => {const userPop = 'Quiz ' + this.currentQuiz.name + ' sélectionné';
                      this.openSnackBar(userPop, 'Ok'); }, 100);
  }

  deleteQuiz(quiz: Quiz) {
    this.quizService.deleteQuiz(quiz);
    this.deleteState = 0;
    this.currentQuiz = this.quizList[0];
    this.openSnackBar('Quiz supprimé !', 'Ok');
  }

  confirmDelete() {
    this.deleteState = 1;
  }

  submitQuiz() {
    // We retrieve here the quiz object from the quizForm and we cast the type "as Quiz".
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
    quizToCreate.questions = [];
    quizToCreate.themeId = Number(this.quizForm.getRawValue().theme);
    const themeToCreate: Theme = this.newthemeForm.getRawValue() as Theme;
    if (themeToCreate.name) {
      themeToCreate.id = (this.themeService.getLastCreatedTheme() + 1);
      this.themeService.createTheme(themeToCreate);
      quizToCreate.themeId = Number(themeToCreate.id);
    }
    // Do you need to log your object here in your class? Uncomment the code below
    // and open your console in your browser by pressing F12 and choose the tab "Console".
    // You will see your quiz object when you click on the create button.
    console.log('Add quiz: ', quizToCreate);
    // Now, add your quiz in the list!
    this.quizService.addQuiz(quizToCreate);
    this.state = 0;
    if (quizToCreate.name !== '' && quizToCreate.themeId !== undefined) {
      setTimeout(() => {const quizPop = 'Quiz \"' + quizToCreate.name + '\" créé';
                        this.openSnackBar(quizPop, 'Ok'); }, 100);
    } else {
      this.openSnackBar('Veuillez renseigner un nom de quiz à créer ainsi qu\'un thème ! ', 'Ok');
    }
  }

}
