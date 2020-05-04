import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-selection-user',
  templateUrl: './selection-user.component.html',
  styleUrls: ['./selection-user.component.scss']
})
export class SelectionUserComponent implements OnInit {
  public userList: User[] = [];
  private state: number;

  constructor(public userService: UserService) {
    this.userService.users$.subscribe((user) => this.userList = user);
    this.state = 0;
   }

  ngOnInit() {
  }

  selectUser(userId: string) {
    this.userService.setSelectedUser(userId);
    this.state = 1;
  }

}
