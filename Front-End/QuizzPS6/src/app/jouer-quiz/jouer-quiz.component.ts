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
  public currentFalseAnswers: Answer[] = [];
  public currentLessQuestionsNumber = 0;

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
    if (this.currentQuestion) {
      console.log('INIT FLEXIBLE');
      this.initFlexibleDifficultyOnQuestion();
    }
    console.log('Fin init flexible');
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
    // Rajouter ici des choses pour stocker les objets des questions precedentes
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
        if (this.selectedUser.repeatQuestion) {
          console.log('Reponses avant fill');
          console.log(this.currentQuestion);
          this.fillQuestionWithAnswers();
          console.log('Reponses apres fill');
          console.log(this.currentQuestion);
        }
        console.log('Taille');
        console.log(this.selectedQuiz.questions.length);
        if (this.index !== this.selectedQuiz.questions.length - 1) {
          console.log('Taille pas depassee ! ');
          this.index++;
          this.currentQuestion = this.selectedQuiz.questions[this.index];
          this.currentLessQuestionsNumber--;
          this.currentLessQuestionsNumber = Math.max(0, this.currentLessQuestionsNumber);
          console.log('Math max 0 et lessQuestions : ' + this.currentLessQuestionsNumber);
          console.log('INIT FLEXIBLE Bonne reponse');
          this.initFlexibleDifficultyOnQuestion();
          console.log('Fin init flexible');
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
        } else {
          if (this.index !== this.selectedQuiz.questions.length - 1) {
            console.log('Taille pas depassee ! ');
            this.index++;
            this.currentQuestion = this.selectedQuiz.questions[this.index];
            this.currentLessQuestionsNumber++;
            this.currentLessQuestionsNumber = Math.min(2, this.currentLessQuestionsNumber);
            console.log('Math min 2 et lessQuestions : ' + this.currentLessQuestionsNumber);
            console.log('INIT FLEXIBLE');
            this.initFlexibleDifficultyOnQuestion();
            console.log('Fin init flexible');
          } else {
            // Ici, il faudra renvoyer sur l ecran de fin de partie
            this.userService.addAttempt(this.selectedUser, new Attempt(this.score, this.selectedQuiz.id));
            console.log('Taille depassee ! ');
            this.state = 1;
            this.index = 0;
          }
        }
      }
    } else {
      console.log('Pas de reponse identifiee !');
    }
  }

  fillQuestionWithAnswers() {
    for (let i = 0; i < this.currentAnswers.length; i++) {
      this.currentQuestion.answers.push(this.currentAnswers[i]);
    }
  }

  initFlexibleDifficultyOnQuestion() {
    if (this.selectedUser.nextQuestionFollows) {
      console.log('IN FLEXIBLE DELETE');
      this.currentFalseAnswers = [];
      let minDelete = 0;
      for (let i = 0; i < this.currentQuestion.answers.length; i++) {
        console.log('COUNT ANSWER : ' + i);
        if (!this.currentQuestion.answers[i].isCorrect) {
          console.log('COUNT CORRECT ANSWER : ' + i);
          console.log('Avant PUSH false Answers');
          console.log(this.currentFalseAnswers);
          this.currentFalseAnswers.push(this.currentQuestion.answers[i]);
          console.log('APRES PUSH false ANswers');
          console.log(this.currentFalseAnswers);
        }
      }
      console.log('FIN premier for');
      minDelete = Math.min(this.currentLessQuestionsNumber, this.currentFalseAnswers.length);
      console.log('MIN DELETE : ' + minDelete);
      for ( let i = 0; i < minDelete; i++) {
        console.log('COUNT DELETE : ' + i);
        console.log(this.currentQuestion.answers);
        const randomNumber = Math.random();
        console.log('Random Number' + randomNumber);
        const lengthFalseAnswers = this.currentFalseAnswers.length;
        console.log('False ANswers length : ' + lengthFalseAnswers);
        const randomIndex = Math.round((lengthFalseAnswers - 1) * randomNumber);
        console.log('Random Index : ' + randomIndex);
        const randomFalseAnswer = this.currentFalseAnswers[randomIndex];
        console.log('Random False Answer : ');
        console.log(randomFalseAnswer);
        const indexToDelete = this.currentQuestion.answers.indexOf(randomFalseAnswer);
        console.log('Answer dans vraie liste a index : ' + indexToDelete);
        console.log(this.currentQuestion.answers[indexToDelete]);
        this.currentQuestion.answers.splice(indexToDelete, 1);
        console.log('Before slice false answers');
        console.log(this.currentFalseAnswers);
        this.currentFalseAnswers.splice(randomIndex, 1);
        console.log('After slice false answers');
        console.log(this.currentFalseAnswers);
        console.log('FIN DU  DELETE : ' + i);
        console.log(this.currentQuestion.answers);
      }
      console.log('CurrentQUestion : ');
      console.log(this.currentQuestion.answers);
    }
  }
}
