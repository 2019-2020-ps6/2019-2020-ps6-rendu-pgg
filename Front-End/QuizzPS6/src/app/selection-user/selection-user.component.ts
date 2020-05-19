import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-selection-user',
  templateUrl: './selection-user.component.html',
  styleUrls: [ './selection-user.component.scss' ]
})
export class SelectionUserComponent implements OnInit {
  public userList: User[] = [];
  public state: number;
  public user: User;

  constructor(public userService: UserService, private snackBar: MatSnackBar) {
    this.userService.users$.subscribe((user) => (this.userList = user));
    this.state = 0;

    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {}

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {duration: 1000});
  }

  selectUser(userId: string) {
    this.userService.setSelectedUser(userId);
    this.state = 1;
    setTimeout(() => {const userPop = 'Utilisateur ' + this.user.firstName + ' ' + this.user.lastName + ' sélectionné';
                      this.openSnackBar(userPop, 'Ok'); }, 100);
  }

  selectTheme() {
    this.state = 2;
  }

  goToSelectionUser() {
    this.state = 0;
  }
}
