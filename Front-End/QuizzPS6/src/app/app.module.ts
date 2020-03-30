import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GestionChoseQuizComponent} from './gestionChoseQuiz/gestionChoseQuiz.component';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { HeaderComponent } from './header/header.component';
import { QuizFormComponent } from './quizzes/quiz-form/quiz-form.component';
import { HttpClientModule } from '@angular/common/http';
import { QuizCreationComponent } from './quizzes/quiz-creation/quiz-creation.component';
import { MenuComponent } from './menu/menu.component';
import { NouveauQuizComponent } from './quizzes/quiz-creation/nouveau-quiz/nouveau-quiz.component';

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
    NouveauQuizComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
