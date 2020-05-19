import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/models/user.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-parametres-quiz',
  templateUrl: './parametres-quiz.component.html',
  styleUrls: [ './parametres-quiz.component.scss' ]
})
export class ParametresQuizComponent implements OnInit {
  public paramsForm: FormGroup;
  public user: User;

  constructor(public formBuilder: FormBuilder, public userService: UserService, private snackBar: MatSnackBar) {
    this.paramsForm = this.formBuilder.group({
      nextQuestionFollows: [],
      bigPointer: [],
      previousQuestion: [],
      repeatQuestion: [],
      answersColor: [],
      displayScore: []
    });

    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
      if (user) {
        this.presetParams(user);
      }
    });
  }

  ngOnInit() {
    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
      if (user) {
        this.presetParams(user);
      }
    });
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {duration: 1000});
  }

  presetParams(user: User) {
    this.paramsForm.get('nextQuestionFollows').setValue(user.nextQuestionFollows);
    this.paramsForm.get('bigPointer').setValue(user.bigPointer);
    this.paramsForm.get('previousQuestion').setValue(user.previousQuestion);
    this.paramsForm.get('repeatQuestion').setValue(user.repeatQuestion);
    this.paramsForm.get('answersColor').setValue(user.answersColor);
    this.paramsForm.get('displayScore').setValue(user.displayScore);
  }

  selectUser(user: User) {
    this.userService.setSelectedUser(user.id);
    this.user = this.userService.userSelected;
    console.log('User : ' + this.user.firstName + ' ' + this.user.lastName);
  }

  validateParams() {
    this.user.nextQuestionFollows = this.paramsForm.controls.nextQuestionFollows.value;
    this.user.bigPointer = this.paramsForm.controls.bigPointer.value;
    this.user.previousQuestion = this.paramsForm.controls.previousQuestion.value;
    this.user.repeatQuestion = this.paramsForm.controls.repeatQuestion.value;
    this.user.answersColor = this.paramsForm.controls.answersColor.value;
    this.user.displayScore = this.paramsForm.controls.displayScore.value;
    this.userService.updateUser(this.user);
    this.openSnackBar('Paramètres sauvegardés', 'Ok');
  }
}
