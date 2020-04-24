import { Injectable } from '@angular/core';
import { BehaviorSubject, ObservableInput, Observable } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { HttpClient } from '@angular/common/http';
import {Theme} from '../models/theme.model';
import {Answer, Question} from '../models/question.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';

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
  private quizzes: Quiz[];
  private quizSelected: Quiz;
  private questions: Question[];
  private currentQuestion: Question;
  private currentAnswer: Answer;

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);
  public quizSelected$: BehaviorSubject<Quiz> = new BehaviorSubject(this.quizSelected);
  public questions$: BehaviorSubject<Question[]> = new BehaviorSubject(this.questions);
  public currentQuestion$: BehaviorSubject<Question> = new BehaviorSubject(this.currentQuestion);
  public currentAnswer$: BehaviorSubject<Answer> = new BehaviorSubject(this.currentAnswer);


  private quizUrl = serverUrl + '/quizzes';
  private questionsPath = 'questions';

  private httpOptions = httpOptionsBase;


  constructor(private http: HttpClient) {
    this.setQuizzesFromUrl();
  }


  setSelectedQuiz(quizId: string) {
    const urlWithId = this.quizUrl + '/' + quizId;
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.quizSelected$.next(quiz);
    });
  }

  setQuizzesFromUrl() {
    return this.http.get<Quiz[]>(this.quizUrl).subscribe((quizzes) => {
      this.quizzes = quizzes;
      this.quizzes$.next(this.quizzes);
      // console.log(this.quizzes);
    });
  }

  addQuiz(quiz: Quiz) {
    const parsed = JSON.parse(JSON.stringify(quiz));
    delete parsed.date;
    delete parsed.questions;
    this.http.post<Quiz>(this.quizUrl, parsed, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
  }

  deleteQuiz(quiz: Quiz) {
    const urlWithId = this.quizUrl + '/' + quiz.id;
    this.http.delete<Quiz>(urlWithId, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
  }

  addQuestion(quiz: Quiz, question: Question) {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath;
    this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id.toString()));
  }

  deleteQuestion(quiz: Quiz, question: Question) {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id.toString();
    this.http.delete<Question>(questionUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id.toString()));
  }
}
