import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/models/user.model';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-parametres-quiz',
  templateUrl: './parametres-quiz.component.html',
  styleUrls: ['./parametres-quiz.component.scss']
})
export class ParametresQuizComponent implements OnInit {
  @Input() currentUser: User;

  constructor(public formBuilder: FormBuilder, public userService: UserService) {
   }

  ngOnInit() {
  }

  selectUser(user: User) {
    this.userService.setSelectedUser(user.id);
    this.currentUser = this.userService.userSelected;
    console.log('User : ' + this.currentUser.firstName + ' ' + this.currentUser.lastName);
  }
}
