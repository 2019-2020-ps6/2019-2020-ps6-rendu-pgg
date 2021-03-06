import { Component, OnInit } from '@angular/core';
import { Quiz } from '../../models/quiz.model';
import { QuizService } from '../../services/quiz.service';
import { Answer, Question } from '../../models/question.model';
import { Attempt } from 'src/models/attempt.model';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-jouer-quiz',
  templateUrl: './jouer-quiz.component.html',
  styleUrls: [ './jouer-quiz.component.scss' ]
})
export class JouerQuizComponent implements OnInit {
  public questionList: Question[];
  public state: number;
  public score;
  public index;
  public selectedQuiz: Quiz;
  public currentQuestion: Question;
  public selectedAnswer: Answer;
  public selectedUser: User;
  public indexAnswer: number;
  public currentAnswers: Answer[] = [];
  public currentFalseAnswers: Answer[] = [];
  public currentLessQuestionsNumber;
  public questionsInfos;
  public saveQuiz: Quiz;
  public questionsCopy: Question[] = [];

  // faire l initialisation du quiz et le recuperer avec le QuizService
  constructor(public quizService: QuizService, public userService: UserService, private snackBar: MatSnackBar) {
    console.log('CONSTRUCTEUR');
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.selectedQuiz = quiz;
      if (quiz) {
        this.initQuestions();
      }
    });
    this.userService.userSelected$.subscribe((user) => {
      this.selectedUser = user;
    });
    this.index = 0;
    this.currentQuestion = this.selectedQuiz.questions[this.index];

    // this.quizService.questions$.subscribe((questions) => this.questionList = questions);
    // console.log(this.questionList);
    console.log('APPEL');
    console.log(this.currentQuestion);
    console.log('Apres current Question');
    this.state = 0;
    this.currentLessQuestionsNumber = 0;
    this.score = 0;
    this.questionsInfos = [];
  }

  ngOnInit() {
    console.log('Jouer Quiz chargement');
    if (this.currentQuestion) {
      // setTimeout(() => this.storeCurrentQuestionDatas(), 2000);
      this.storeCurrentQuestionDatas();
      console.log('INIT FLEXIBLE');
      this.initFlexibleDifficultyOnQuestion();
      console.log('Fin init flexible');
      console.log('CurrentLessQuestions : ' + this.currentLessQuestionsNumber);
    }
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {duration: 2000});
  }

  selectionnerAnswer(answer: Answer, index: number) {
    this.selectedAnswer = answer;
    this.state = 2;
    this.indexAnswer = index;
    setTimeout(() => {const userPop = 'Réponse \"' + this.selectedAnswer.value + '\" sélectionnée';
                      this.openSnackBar(userPop, 'Ok'); }, 100);
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
    console.log('Previous Question Button\n\n');
    if (this.index !== 0) {
      this.resetAlreadyAnsweredQuestion();
      this.index--;
      this.score -= 50;
      this.currentQuestion = this.selectedQuiz.questions[this.index];
      this.selectedAnswer = undefined;
      if (this.selectedUser.nextQuestionFollows) {
        // this.currentLessQuestionsNumber = this.questionsInfos[this.index][0];
        // this.currentQuestion.answers = this.questionsInfos[this.index][1];
        // this.score = this.questionsInfos[this.index][2];
        // console.log('Before POP questions infos ');
        // console.log(this.questionsInfos);
        // this.questionsInfos.pop();
        // console.log('After POP questions infos ');
        // console.log(this.questionsInfos);
        this.resetAlreadyAnsweredQuestion();
        this.storeCurrentQuestionDatas();
        this.initFlexibleDifficultyOnQuestion();
      }
    }
    console.log('End Previous Question\n\n');
    // Rajouter ici des choses pour stocker les objets des questions precedentes
    this.openSnackBar('Retour à la question précédente effectué !', 'Ok');
  }

  validerAnswer() {
    console.log(this.selectedAnswer);
    console.log('Index courant : ');
    console.log(this.index);
    // if (this.state === 2) {
    if (this.selectedAnswer !== undefined) {
      console.log('Reponse selectionee');
      if (this.selectedAnswer.isCorrect) {
        if (this.selectedUser.repeatQuestion) {
          console.log('Reponses avant fill');
          console.log(this.currentQuestion);
          this.fillQuestionWithAnswers();
          console.log('Reponses apres fill');
          console.log(this.currentQuestion);
        }
        this.goToNextQuestion(true);
      } else {
        if (this.selectedUser.repeatQuestion) {
          console.log('Debut ANswers');
          console.log(this.currentAnswers);
          if (this.currentQuestion.answers.length > 2) {
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
          this.currentLessQuestionsNumber++;
          // this.currentLessQuestionsNumber = Math.min(2, this.currentLessQuestionsNumber);
          this.score = this.score - 10;
          this.openSnackBar('Mauvaise réponse ! ', 'Ok');
        } else {
          this.goToNextQuestion(false);
        }
      }
      // this.fillQuestionWithAnswers();
    } else {
      console.log('Pas de reponse identifiee !');
      this.openSnackBar('Veuillez sélectionner une réponse à valider !', 'Ok');
    }
  }

  goToNextQuestion(correct: boolean) {
    if (!this.selectedUser.repeatQuestion) {
      // this.fillQuestionWithAnswers();
      console.log('On reremplit avec les reponses initiales');
    }
    if (correct) {
      this.score = this.score + 50;
      console.log('Bonne reponse');
      this.openSnackBar('Bonne réponse ! ', 'Ok');
    } else {
      this.score = this.score - 10;
      console.log('Mauvaise reponse');
      this.openSnackBar('Mauvaise réponse ! ', 'Ok');
    }
    this.state = 0;
    this.selectedAnswer = undefined;
    console.log('Taille');
    console.log(this.selectedQuiz.questions.length);
    if (this.index !== this.selectedQuiz.questions.length - 1) {
      console.log('Taille pas depassee ! ');
      this.index++;
      this.currentQuestion = this.selectedQuiz.questions[this.index];
      if (correct) {
        this.currentLessQuestionsNumber--;
        // this.currentLessQuestionsNumber = Math.max(0, this.currentLessQuestionsNumber);
        console.log('Math max 0 et lessQuestions : ' + this.currentLessQuestionsNumber);
      } else {
        this.currentLessQuestionsNumber++;
        // this.currentLessQuestionsNumber = Math.min(2, this.currentLessQuestionsNumber);
        console.log('Math min 2 et lessQuestions : ' + this.currentLessQuestionsNumber);
      }
      this.currentLessQuestionsNumber = Math.min(2, this.currentLessQuestionsNumber);
      this.currentLessQuestionsNumber = Math.max(0, this.currentLessQuestionsNumber);
      this.storeCurrentQuestionDatas();
      console.log('INIT FLEXIBLE');
      this.initFlexibleDifficultyOnQuestion();
      console.log('Fin init flexible ');
      // this.openSnackBar('Question suivante ! ', 'Ok');
    } else {
      // Ici, il faudra renvoyer sur l ecran de fin de partie
      // this.userService.addAttempt(this.selectedUser, new Attempt(this.score, this.selectedQuiz.id));
      // console.log('Taille depassee ! ');
      // this.state = 1;
      // this.index = 0;
      // this.resetAlreadyAnsweredQuestion();
      this.setEndOfQuiz();
      this.openSnackBar('Quiz terminé !', 'Ok');
    }
  }

  fillQuestionWithAnswers() {
    for (let i = 0; i < this.currentAnswers.length; i++) {
      this.currentQuestion.answers.push(this.currentAnswers[i]);
    }
    this.currentAnswers = [];
  }

  initFlexibleDifficultyOnQuestion() {
    if (this.selectedUser.nextQuestionFollows) {
      console.log('IN FLEXIBLE DELETE');
      this.currentFalseAnswers = [];
      let minDelete = 0;
      for (let i = 0; i < this.currentQuestion.answers.length; i++) {
        // console.log('COUNT ANSWER : ' + i);
        if (!this.currentQuestion.answers[i].isCorrect) {
          // console.log('COUNT FALSE ANSWER : ' + i);
          // console.log('Avant PUSH false Answers');
          // console.log(this.currentFalseAnswers);
          this.currentFalseAnswers.push(this.currentQuestion.answers[i]);
          // console.log('APRES PUSH false ANswers');
          // console.log(this.currentFalseAnswers);
        }
      }
      console.log('FIN premier for');
      minDelete = Math.min(this.currentLessQuestionsNumber, this.currentFalseAnswers.length);
      console.log('MIN DELETE : ' + minDelete);
      for ( let i = 0; i < minDelete; i++) {
        // console.log('COUNT DELETE : ' + i);
        // console.log(this.currentQuestion.answers);
        const randomNumber = Math.random();
        // console.log('Random Number' + randomNumber);
        const lengthFalseAnswers = this.currentFalseAnswers.length;
        // console.log('False ANswers length : ' + lengthFalseAnswers);
        const randomIndex = Math.round((lengthFalseAnswers - 1) * randomNumber);
        // console.log('Random Index : ' + randomIndex);
        const randomFalseAnswer = this.currentFalseAnswers[randomIndex];
        // console.log('Random False Answer : ');
        // console.log(randomFalseAnswer);
        const indexToDelete = this.currentQuestion.answers.indexOf(randomFalseAnswer);
        // console.log('Answer dans vraie liste a index : ' + indexToDelete);
        // console.log(this.currentQuestion.answers[indexToDelete]);
        this.currentQuestion.answers.splice(indexToDelete, 1);
        // console.log('Before slice false answers');
        // console.log(this.currentFalseAnswers);
        // console.log('Before push in flex init currentAnswers');
        // console.log(this.currentAnswers);
        // On ajoute la reponse que l on supprime a la liste des reponses initiales supprimes
        this.currentAnswers.push(this.currentFalseAnswers[randomIndex]);
        // console.log('After push in flex init currentAnswers');
        // console.log(this.currentAnswers);
        this.currentFalseAnswers.splice(randomIndex, 1);
        // console.log('After slice false answers');
        // console.log(this.currentFalseAnswers);
        // console.log('FIN DU  DELETE : ' + i);
        // console.log(this.currentQuestion.answers);
      }
      console.log('CurrentQUestion : ');
      console.log(this.currentQuestion.answers);
    }
  }

  storeCurrentQuestionDatas() {
    console.log('Storing datas : currentAnswers : ');
    const currentAnswersToStore = JSON.parse(JSON.stringify(this.currentQuestion.answers));
    // const currentAnswersToStore = this.currentQuestion.answers;
    console.log(currentAnswersToStore);
    this.questionsInfos.push([this.currentLessQuestionsNumber, currentAnswersToStore, this.score]);
    console.log('Questions Infos after storing');
    console.log(this.questionsInfos);
    console.log('Fin Storing');
  }

  setEndOfQuiz() {
    this.userService.addAttempt(this.selectedUser, new Attempt(this.score, this.selectedQuiz.id));
    console.log('Taille depassee ! ');
    // this.selectedQuiz = this.saveQuiz;
    this.resetAnswers();
    for ( let i = 0; i < this.questionsInfos.length; i++) {
      this.questionsInfos[i] = undefined;
    }
    this.state = 1;
    console.log('CurrentLessQuestins fin quizz : ');
    console.log(this.currentLessQuestionsNumber);
    // this.index = 0;
    // this.currentLessQuestionsNumber = 0;
    // this.resetAlreadyAnsweredQuestion();
  }
  resetAlreadyAnsweredQuestion() {
    this.currentLessQuestionsNumber = this.questionsInfos[this.index][0];
    this.currentQuestion.answers = this.questionsInfos[this.index][1];
    this.score = this.questionsInfos[this.index][2];
    console.log('Before POP questions infos ');
    console.log(this.questionsInfos);
    this.questionsInfos.pop();
    console.log('After POP questions infos ');
    console.log(this.questionsInfos);
  }

  initQuestions() {
    for (let i = 0; i < this.selectedQuiz.questions.length; i++) {
        this.questionsCopy.push(JSON.parse(JSON.stringify(this.selectedQuiz.questions[i])));
    }
    console.log('Copie des questions');
    console.log(this.questionsCopy);
    console.log('Fin affichage copie des questions');
  }

  resetAnswers() {
    // Reset les reponses des questions
    for (let i = 0; i < this.questionsCopy.length; i++) {
      for (let j = 0; j < this.questionsCopy[i].answers.length; j++) {
        this.selectedQuiz.questions[i].answers[j] = this.questionsCopy[i].answers[j];
      }
    }
  }
}
