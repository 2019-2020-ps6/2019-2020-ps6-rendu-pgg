import { Injectable } from '@angular/core';
import { BehaviorSubject, ObservableInput, Observable } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

   /**
    * The list of quiz.
    * The list is retrieved from the mock.
    */
  private quizzes: Quiz[] = QUIZ_LIST;

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);
  public url = 'http://localhost:9428/api/quizzes';

  constructor(private http: HttpClient) {
    this.setQuizzesFromUrl();
  }

  addQuiz(quiz: Quiz) {
    this.quizzes.push(quiz);
    this.quizzes$.next(this.quizzes);
    console.log(quiz);

  }

  deleteQuiz(quiz: Quiz) {
    const index = this.quizzes.indexOf(quiz);
    if (index > -1) {
      this.quizzes.splice(index, 1);
    }
    console.log('Deleting quiz...');
    this.http.delete<Quiz>(this.url + '/' + quiz.id).subscribe( (quizzes) => {
      console.log( 'success' );
    });
  }

  setQuizzesFromUrl() {
    return this.http.get<Quiz[]>(this.url).subscribe((quizzes) => {
      this.quizzes = quizzes;
      this.quizzes$.next(this.quizzes);
      console.log(this.quizzes);
    });
  }



    getQuizzesByThemeId(themeId): Observable<Quiz[]> {
    // 1. call a GET  api/quizzes/getQuizzesByThemeId/5
    return this.http.get<Quiz[]>(this.url + '/getQuizzesByThemeId/' + themeId).pipe();
  }
}
