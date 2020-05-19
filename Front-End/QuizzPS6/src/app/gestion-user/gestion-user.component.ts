import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz.model';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-gestion-user',
  templateUrl: './gestion-user.component.html',
  styleUrls: ['./gestion-user.component.scss']
})
export class GestionUserComponent implements OnInit {
  public userList: User[] = [];
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

    this.userService.users$.subscribe((user) => this.userList = user);
    this.quizService.quizzes$.subscribe((quiz) => this.quizList = quiz);
    this.state = 0;
    this.deleteState = 0;
  }

  ngOnInit() {
    console.log('menu user chargé');
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {duration: 2000});
  }
  selectUser(user: User) {
    this.state = 1;
    this.currentUser = user;
    this.userService.setSelectedUser(user.id);
    this.deleteState = 0;
  }

  createUser() {
    const userToCreate: User = this.userForm.getRawValue() as User;
    userToCreate.attempts = [];

    // Do you need to log your object here in your class? Uncomment the code below
    // and open your console in your browser by pressing F12 and choose the tab "Console".
    // You will see your quiz object when you click on the create button.
    console.log('Created user : ', userToCreate);

    // Now, add your quiz in the list!
    this.userService.addUser(userToCreate);
    this.deleteState = 0;
    if (userToCreate.firstName && userToCreate.lastName) {
      this.openSnackBar('Utilisateur créé !', 'Ok');
    }
  }

  confirmDelete() {
    this.deleteState = 1;
  }

  deleteUser(user: User) {
    // tslint:disable-next-line:no-shadowed-variable
    this.state = 0;
    this.deleteState = 0;
    this.userService.deleteUser(user);
    this.openSnackBar('Utilisateur supprimé !', 'Ok');
  }

  userOption(user: User) {
    console.log(user);
    this.deleteState = 0;
    this.state = 4;
  }

  seeAttempts() {
    this.deleteState = 0;
    this.state = 5;
  }
}
