import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz.model';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-attempts-user',
  templateUrl: './attempts-user.component.html',
  styleUrls: ['./attempts-user.component.scss']
})
export class AttemptsUserComponent implements OnInit {
  public quizList: Quiz[] = [];
  public currentUser: User;
  state: number;
  deleteState: number;

  public userForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public userService: UserService, public quizService: QuizService,
              private snackBar: MatSnackBar) {
    this.userForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
    });

    this.userService.userSelected$.subscribe((user) => this.currentUser = user);
    this.quizService.quizzes$.subscribe((quiz) => this.quizList = quiz);
    this.state = 0;
    this.deleteState = 0;
  }

  ngOnInit() {
    console.log('menu user chargé');
  }
  deleteAttempts() {
    this.currentUser.attempts = [];
    this.openSnackBar('Historique des parties supprimé !', 'Ok');
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {duration: 2000});
  }

}
