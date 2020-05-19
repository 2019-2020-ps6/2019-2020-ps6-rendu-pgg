import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-selection-user',
  templateUrl: './selection-user.component.html',
  styleUrls: [ './selection-user.component.scss' ]
})
export class SelectionUserComponent implements OnInit {
  public userList: User[] = [];
  private state: number;
  public user: User;

  constructor(public userService: UserService) {
    this.userService.users$.subscribe((user) => (this.userList = user));
    this.state = 0;

    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {}

  selectUser(userId: string) {
    this.userService.setSelectedUser(userId);
    this.state = 1;
  }

  selectTheme() {
    this.state = 2;
  }

  goToSelectionUser() {
    this.state = 0;
  }
}
