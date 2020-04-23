import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../models/quiz.model';
import {QuizService} from '../../services/quiz.service';
import {Answer, Question} from '../../models/question.model';

@Component({
  selector: 'app-jouer-quiz',
  templateUrl: './jouer-quiz.component.html',
  styleUrls: ['./jouer-quiz.component.scss']
})
export class JouerQuizComponent implements OnInit {
  public questionList: Question[];
  public state: number;
  public index = 0;
  public selectedQuiz: Quiz;
  public currentQuestion: Question;
  public selectedAnswer: Answer;

  // faire l initialisation du quiz et le recuperer avec le QuizService
  constructor(public quizService: QuizService) {
    console.log('CONSTRUCTEUR');
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.selectedQuiz = quiz;
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

  selectionnerAnswer(answer: Answer) {
    console.log('Taille test ts : ');
    console.log(this.selectedQuiz.questions[this.selectedQuiz.questions.length - 1]);
    console.log('Reponse selectionne !');
    console.log(answer);
    console.log('Patate');
    this.selectedAnswer = answer;
    // this.themeService.themeSelected$.subscribe((theme) => this.currentTheme = theme);
    // console.log(this.currentTheme);
    this.state = 2;
    // this.selectedQuiz = this.selectedQuiz.questions[1];
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

  validerAnswer() {
    console.log(this.selectedAnswer);
    console.log('Index courant : ');
    console.log(this.index);
    if (this.state === 2) {
      console.log('Reponse selectionee');
      if (this.selectedAnswer.isCorrect) {
        console.log('Bonne reponse ! ');
        this.state = 0;
        console.log('Taille');
        console.log(this.selectedQuiz.questions.length);
        if ( this.index !== this.selectedQuiz.questions.length - 1) {
          console.log('Taille pas depassee ! ');
          this.index++;
          this.currentQuestion = this.selectedQuiz.questions[this.index];
        } else {
          // Ici, il faudra renvoyer sur l ecran de fin de partie
          console.log('Taille depassee ! ');
          this.index = 0;
        }
      } else {
        console.log('Mauvaise reponse ! ');
      }
    } else {
      console.log('NUL');
    }
  }

}
