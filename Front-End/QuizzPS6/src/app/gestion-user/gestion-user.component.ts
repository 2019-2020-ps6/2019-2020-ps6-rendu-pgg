import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz.model';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-gestion-user',
  templateUrl: './gestion-user.component.html',
  styleUrls: ['./gestion-user.component.scss']
})
export class GestionUserComponent implements OnInit {
  public userList: User[] = [];
  public currentUser: User;
  state: number;

  constructor(public userService: UserService) {
    this.userService.users$.subscribe((user) => this.userList = user);
    this.state = 0;
  }

  ngOnInit() {
    console.log('menu chargé');
  }

  selectUser(user: User) {
    this.state = 1;
    this.currentUser = user;
  }
}
