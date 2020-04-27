import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz.model';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gestion-user',
  templateUrl: './gestion-user.component.html',
  styleUrls: ['./gestion-user.component.scss']
})
export class GestionUserComponent implements OnInit {
  public userList: User[] = [];
  public currentUser: User;
  state: number;

  public userForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public userService: UserService, public quizService: QuizService) {
    this.userForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
    });

    this.userService.users$.subscribe((user) => this.userList = user);
    this.state = 0;
  }

  ngOnInit() {
    console.log('menu user chargé');
  }

  selectUser(user: User) {
    this.state = 1;
    this.currentUser = user;
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
  }

  deleteUser(user: User) {
    // tslint:disable-next-line:no-shadowed-variable
    this.userService.users$.subscribe((user) => this.userList = user);
    this.state = 0;
    this.userService.deleteUser(user);
  }

  userOption(user: User) {
    console.log(user);
    this.state = 4;
  }
}
