import { Component, OnInit } from '@angular/core';
import { Quiz } from '../../models/quiz.model';
import { QuizService } from '../../services/quiz.service';
import { Answer, Question } from '../../models/question.model';
import { Attempt } from 'src/models/attempt.model';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-jouer-quiz',
  templateUrl: './jouer-quiz.component.html',
  styleUrls: [ './jouer-quiz.component.scss' ]
})
export class JouerQuizComponent implements OnInit {
  public questionList: Question[];
  public state: number;
  public score = 0;
  public index = 0;
  public selectedQuiz: Quiz;
  public currentQuestion: Question;
  public selectedAnswer: Answer;
  public selectedUser: User;
  public indexAnswer: number;
  public questionCopy: Question;
  public currentAnswers: Answer[] = [];

  // faire l initialisation du quiz et le recuperer avec le QuizService
  constructor(public quizService: QuizService, public userService: UserService) {
    console.log('CONSTRUCTEUR');
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.selectedQuiz = quiz;
    });
    this.userService.userSelected$.subscribe((user) => {
      this.selectedUser = user;
    });
    this.currentQuestion = this.selectedQuiz.questions[this.index];

    // this.quizService.questions$.subscribe((questions) => this.questionList = questions);
    // console.log(this.questionList);
    console.log('APPEL');
    console.log(this.currentQuestion);
    console.log('Apres current Question');
    this.state = 0;
  }

  ngOnInit() {
    console.log('Jouer Quiz chargement');
  }

  selectionnerAnswer(answer: Answer, index: number) {
    // console.log('Taille test ts : ');
    // console.log(this.selectedQuiz.questions[this.selectedQuiz.questions.length - 1]);
    // console.log('Reponse selectionne !');
    // console.log(answer);
    this.selectedAnswer = answer;
    this.state = 2;
    this.indexAnswer = index;
  }

  check() {
    console.log('Question Selectionne dans Quiz : ');
    console.log(this.selectedQuiz);
    console.log(this.currentQuestion);
    console.log(this.currentQuestion.answers[0]);
    console.log(this.selectedAnswer);
    console.log('champion');
    console.log('Fin affichage Reponses check');
  }

  previousQuestion() {
    if (this.index !== 0) {
      this.index--;
      this.score -= 50;
      this.currentQuestion = this.selectedQuiz.questions[this.index];
      this.selectedAnswer = undefined;
    }
  }

  validerAnswer() {
    console.log(this.selectedAnswer);
    console.log('Index courant : ');
    console.log(this.index);
    // if (this.state === 2) {
    if (this.selectedAnswer !== undefined) {
      console.log('Reponse selectionee');
      if (this.selectedAnswer.isCorrect) {
        console.log('Bonne reponse ! ');
        this.score = this.score + 50;
        this.state = 0;
        this.selectedAnswer = undefined;
        console.log('Reponses avant fill');
        console.log(this.currentQuestion);
        this.fillQuestionWithAnswers();
        console.log('Reponses apres fill');
        console.log(this.currentQuestion);
        console.log('Taille');
        console.log(this.selectedQuiz.questions.length);
        if (this.index !== this.selectedQuiz.questions.length - 1) {
          console.log('Taille pas depassee ! ');
          this.index++;
          this.currentQuestion = this.selectedQuiz.questions[this.index];
        } else {
          // Ici, il faudra renvoyer sur l ecran de fin de partie
          this.userService.addAttempt(this.selectedUser, new Attempt(this.score, this.selectedQuiz.id));
          console.log('Taille depassee ! ');
          this.state = 1;
          this.index = 0;
        }
      } else {
        console.log('Mauvaise reponse ! ');
        this.state = 0;
        this.score = this.score - 10;
        if (this.selectedUser.repeatQuestion) {
          console.log('Debut ANswers');
          console.log(this.currentAnswers);
          this.currentAnswers.push(this.selectedAnswer);
          // console.log('Question Copy');
          // console.log(this.questionCopy);
          // console.log('Current Question Variable : ');
          // console.log(this.currentQuestion);
          this.currentQuestion.answers.splice(this.indexAnswer, 1);
          // console.log('Original One Question : ');
          // console.log(this.selectedQuiz.questions[this.index]);
          // console.log('Current Question Variable : ');
          // console.log(this.currentQuestion);
          // console.log('Question Copy');
          // console.log(this.questionCopy);
          console.log('Reponses');
          console.log(this.currentAnswers);
        }
      }
    } else {
      console.log('NUL');
    }
  }

  fillQuestionWithAnswers() {
    for (let i = 0; i < this.currentAnswers.length; i++) {
      this.currentQuestion.answers.push(this.currentAnswers[i]);
    }
  }
}
