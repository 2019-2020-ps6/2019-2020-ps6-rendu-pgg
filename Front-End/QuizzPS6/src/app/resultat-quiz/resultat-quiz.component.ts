import { Component, OnInit, Input } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-resultat-quiz',
  templateUrl: './resultat-quiz.component.html',
  styleUrls: ['./resultat-quiz.component.scss']
})
export class ResultatQuizComponent implements OnInit {
  @Input() score: number;
  public state: number;
  public currentUser: User;

  constructor(public userService: UserService) {
    this.userService.userSelected$.subscribe((user) => this.currentUser = user);
    console.log('RESULTAT QUIZ');
  }

  ngOnInit() {
  }

  recommencerQuiz() {
    this.state = 2;
  }

  choisirQuiz() {
    this.state = 3;
  }

}
