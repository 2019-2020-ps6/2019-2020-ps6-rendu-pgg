import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import {Theme} from '../../../models/theme.model';
import {ThemeService} from '../../../services/theme.service';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})
export class QuizFormComponent implements OnInit {
  public themeList: Theme[] = [];
  public state: number;
  public currentTheme: Theme;
  public THEME_LIST: string[] = ['Sport', 'Histoire'];
  // Note: We are using here ReactiveForms to create our form. Be careful when you look for some documentation to
  // avoid TemplateDrivenForm (another type of form)

  /**
   * QuizForm: Object which manages the form in our component.
   * More information about Reactive Forms: https://angular.io/guide/reactive-forms#step-1-creating-a-formgroup-instance
   */
  public quizForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService, public themeService: ThemeService) {
    // Form creation
    this.quizForm = this.formBuilder.group({
      name: [''],
      date: new Date(Date.now()),
      theme: [''],
    });

    this.themeService.themes$.subscribe((theme) => this.themeList = theme);
    // You can also add validators to your inputs such as required, maxlength or even create your own validator!
    // More information: https://angular.io/guide/reactive-forms#simple-form-validation
    // Advanced validation: https://angular.io/guide/form-validation#reactive-form-validation

  }

  ngOnInit() {
    this.themeService.getThemes().subscribe((listItem) => {
      this.themeList = listItem;


    }, err => {
      console.log(err);
    });
  }

  addQuiz() {
    // We retrieve here the quiz object from the quizForm and we cast the type "as Quiz".
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
    quizToCreate.questions = [];

    // Do you need to log your object here in your class? Uncomment the code below
    // and open your console in your browser by pressing F12 and choose the tab "Console".
    // You will see your quiz object when you click on the create button.
    console.log('Add quiz: ', quizToCreate);

    // Now, add your quiz in the list!
    this.quizService.addQuiz(quizToCreate);
  }

}
