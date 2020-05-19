import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-resultat-quiz',
  templateUrl: './resultat-quiz.component.html',
  styleUrls: [ './resultat-quiz.component.scss' ]
})
export class ResultatQuizComponent implements OnInit {
  @Input() score: number;
  public state: number;
  public currentUser: User;

  constructor(public userService: UserService, private snackBar: MatSnackBar) {
    this.userService.userSelected$.subscribe((user) => (this.currentUser = user));
    console.log('RESULTAT QUIZ');
  }

  ngOnInit() {
    console.log('Resultat Quiz ngInit');
    if (this.score) {
      this.score = Math.max(this.score, 0);
    }
    console.log('New Score');
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {duration: 2000});
  }

  recommencerQuiz() {
    this.state = 2;
  }

  choisirQuiz() {
    this.state = 3;
  }
}
