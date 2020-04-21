import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  state: number;

  constructor() {
    this.state = 0;
  }

  ngOnInit() {
    console.log('menu Hub chargé');
  }

  playQuiz() {
    this.state = 1;
  }

  editQuiz() {
    this.state = 2;
  }

  editUser() {
    this.state = 3;
  }

  backToMain() {
    this.state = 0;
  }

}
