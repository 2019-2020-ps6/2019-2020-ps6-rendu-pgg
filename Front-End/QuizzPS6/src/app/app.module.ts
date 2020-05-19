import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GestionChoseQuizComponent} from './gestionChoseQuiz/gestionChoseQuiz.component';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { HeaderComponent } from './header/header.component';
import { QuizFormComponent } from './quizzes/quiz-form/quiz-form.component';
import { HttpClientModule } from '@angular/common/http';
import { QuizCreationComponent } from './quizzes/quiz-creation/quiz-creation.component';
import { MenuComponent} from './menu/menu.component';
import { NouveauQuizComponent } from './quizzes/quiz-creation/nouveau-quiz/nouveau-quiz.component';
import { SelectionThemeComponent } from './selection-theme/selection-theme.component';
import { SelectionQuizComponent } from './selection-quiz/selection-quiz.component';
import { JouerQuizComponent } from './jouer-quiz/jouer-quiz.component';
import { GestionUserComponent } from './gestion-user/gestion-user.component';
import { EditQuestionsComponent } from './gestionChoseQuiz/editQuestions/edit-questions.component';
import { ResultatQuizComponent } from './resultat-quiz/resultat-quiz.component';
import { ParametresQuizComponent } from './parametres-quiz/parametres-quiz.component';
import { SelectionUserComponent } from './selection-user/selection-user.component';
import { GestionThemeComponent } from './gestion-theme/gestion-theme.component';
import { AttemptsUserComponent } from './attempts-user/attempts-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar} from '@angular/material/snack-bar';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import {MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, MatBottomSheet} from '@angular/material/bottom-sheet';
import { MatBottomSheetModule} from '@angular/material/bottom-sheet';

@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    QuizComponent,
    HeaderComponent,
    QuizFormComponent,
    GestionChoseQuizComponent,
    QuizCreationComponent,
    MenuComponent,
    NouveauQuizComponent,
    SelectionThemeComponent,
    SelectionQuizComponent,
    JouerQuizComponent,
    GestionUserComponent,
    EditQuestionsComponent,
    ResultatQuizComponent,
    ParametresQuizComponent,
    SelectionUserComponent,
    GestionThemeComponent,
    AttemptsUserComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatBottomSheetModule
  ],
  entryComponents: [
],
  exports: [
    MatSnackBarModule
  ],
  providers: [{provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
