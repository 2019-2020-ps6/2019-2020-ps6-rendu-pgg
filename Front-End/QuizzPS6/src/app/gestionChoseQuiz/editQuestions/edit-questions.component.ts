import { Component, OnInit, Input } from '@angular/core';
import { Quiz } from 'src/models/quiz.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Question, Answer } from 'src/models/question.model';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-edit-questions',
  templateUrl: './edit-questions.component.html',
  styleUrls: ['./edit-questions.component.scss']
})
export class EditQuestionsComponent implements OnInit {
  @Input() quiz: Quiz;
  state: number;
  public questionForm: FormGroup;
  public questionEditForm: FormGroup;
  editedQuestion: Question;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    this.questionForm = this.formBuilder.group({
      label: [''],
      answer1: [''],
      answer2: [''],
      answer3: [''],
      answer4: [''],
      answer1true: [],
      answer2true: [],
      answer3true: [],
      answer4true: [],
    });

    this.questionEditForm = this.formBuilder.group({
      label: [''],
      answer1: [''],
      answer2: [''],
      answer3: [''],
      answer4: [''],
      answer1true: [],
      answer2true: [],
      answer3true: [],
      answer4true: [],
    });

    this.state = 0;
  }

  ngOnInit() {
  }

  deleteQuestion() {
    this.quizService.deleteQuestion(this.quiz, this.editedQuestion);
  }

  selectQuestion(question: Question) {
    this.editedQuestion = question;
    this.state = 1;
    this.questionEditForm.get('label').setValue(this.editedQuestion.label);
    this.questionEditForm.get('answer1').setValue(this.editedQuestion.answers[0].value);
    this.questionEditForm.get('answer1true').setValue(this.editedQuestion.answers[0].isCorrect);

    if (this.editedQuestion.answers.length >= 2) {
      this.questionEditForm.get('answer2').setValue(this.editedQuestion.answers[1].value);
      this.questionEditForm.get('answer2true').setValue(this.editedQuestion.answers[1].isCorrect);
    }

    if (this.editedQuestion.answers.length >= 3) {
      this.questionEditForm.get('answer3').setValue(this.editedQuestion.answers[2].value);
      this.questionEditForm.get('answer3true').setValue(this.editedQuestion.answers[2].isCorrect);
    }

    if (this.editedQuestion.answers.length >= 4) {
      this.questionEditForm.get('answer4').setValue(this.editedQuestion.answers[3].value);
      this.questionEditForm.get('answer4true').setValue(this.editedQuestion.answers[3].isCorrect);
    }
  }

  updateQuestion() {
    const questionToUpdate: Question = new Question();
    questionToUpdate.id = this.editedQuestion.id;
    questionToUpdate.label = this.questionEditForm.controls.label.value;
    console.log('ID :' + questionToUpdate.id + ', ' + questionToUpdate.label);

    questionToUpdate.answers = [];
    const answer1: Answer = new Answer();
    answer1.value = this.questionEditForm.getRawValue().answer1;
    if (this.questionEditForm.controls.answer1true.value === null || this.questionEditForm.getRawValue().answer1true === false) {
      answer1.isCorrect = false;
    } else {answer1.isCorrect = true; }
    console.log('a1 : ' + answer1.value + ', ' + answer1.isCorrect);
    questionToUpdate.answers.push(answer1);

    if (this.questionEditForm.getRawValue().answer2 !== '') {
      const answer2: Answer = new Answer();
      answer2.value = this.questionEditForm.getRawValue().answer2;
      if (this.questionEditForm.controls.answer2true.value === null || this.questionEditForm.getRawValue().answer2true === false) {
        answer2.isCorrect = false;
      } else {answer2.isCorrect = true; }
      console.log('a2 : ' + answer2.value + ', ' + answer2.isCorrect);
      questionToUpdate.answers.push(answer2);
    }

    if (this.questionEditForm.getRawValue().answer3 !== '') {
      const answer3: Answer = new Answer();
      answer3.value = this.questionEditForm.getRawValue().answer3;
      if (this.questionEditForm.controls.answer3true.value === null || this.questionEditForm.getRawValue().answer3true === false) {
        answer3.isCorrect = false;
      } else {answer3.isCorrect = true; }
      console.log('a3 : ' + answer3.value + ', ' + answer3.isCorrect);
      questionToUpdate.answers.push(answer3);
    }

    if (this.questionEditForm.getRawValue().answer4 !== '') {
      const answer4: Answer = new Answer();
      answer4.value = this.questionEditForm.getRawValue().answer4;
      if (this.questionEditForm.controls.answer4true.value === null || this.questionEditForm.getRawValue().answer4true === false) {
        answer4.isCorrect = false;
      } else {answer4.isCorrect = true; }
      console.log('a4 : ' + answer4.value + ', ' + answer4.isCorrect);
      questionToUpdate.answers.push(answer4);
    }

    this.quizService.editQuestion(this.quiz, questionToUpdate);
  }

  createQuestions() {
    const questionToCreate: Question = this.questionForm.getRawValue() as Question;
    console.log('Label : ' + questionToCreate.label);

    questionToCreate.answers = [];

    const answer1: Answer = new Answer();
    answer1.value = this.questionForm.getRawValue().answer1;
    if (this.questionForm.controls.answer1true.value === null || this.questionForm.getRawValue().answer1true === false) {
      answer1.isCorrect = false;
    } else {answer1.isCorrect = true; }
    console.log('a1 : ' + answer1.value + ', ' + answer1.isCorrect);
    questionToCreate.answers.push(answer1);

    if (this.questionForm.getRawValue().answer2 !== '') {
      const answer2: Answer = new Answer();
      answer2.value = this.questionForm.getRawValue().answer2;
      if (this.questionForm.controls.answer2true.value === null || this.questionForm.getRawValue().answer2true === false) {
        answer2.isCorrect = false;
      } else {answer2.isCorrect = true; }
      console.log('a2 : ' + answer2.value + ', ' + answer2.isCorrect);
      questionToCreate.answers.push(answer2);
    }

    if (this.questionForm.getRawValue().answer3 !== '') {
      const answer3: Answer = new Answer();
      answer3.value = this.questionForm.getRawValue().answer3;
      if (this.questionForm.controls.answer3true.value === null || this.questionForm.getRawValue().answer3true === false) {
        answer3.isCorrect = false;
      } else {answer3.isCorrect = true; }
      console.log('a3 : ' + answer3.value + ', ' + answer3.isCorrect);
      questionToCreate.answers.push(answer3);
    }

    if (this.questionForm.getRawValue().answer4 !== '') {
      const answer4: Answer = new Answer();
      answer4.value = this.questionForm.getRawValue().answer4;
      if (this.questionForm.controls.answer4true.value === null || this.questionForm.getRawValue().answer4true === false) {
        answer4.isCorrect = false;
      } else {answer4.isCorrect = true; }
      console.log('a4 : ' + answer4.value + ', ' + answer4.isCorrect);
      questionToCreate.answers.push(answer4);
    }

    const parsed = JSON.parse(JSON.stringify(questionToCreate));
    delete parsed.answer1;
    delete parsed.answer2;
    delete parsed.answer3;
    delete parsed.answer4;
    delete parsed.answer1true;
    delete parsed.answer2true;
    delete parsed.answer3true;
    delete parsed.answer4true;
    this.quizService.addQuestion(this.quiz, parsed);
  }

}
