import { User } from './../../models/user.model';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: [ './menu.component.scss' ]
})
export class MenuComponent implements OnInit {
  state: number;
  public user: User;

  constructor(public userService: UserService) {
    this.state = 0;

    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
    });
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

  userOption() {
    this.state = 4;
  }

  setBigCursor() {

    const cursor = 'url("assets/cursor.png"), url("assets/cursor.cur"), auto';
    const htmls = document.getElementsByTagName('html');
    const btns = document.getElementsByTagName('button');
    const inputs = document.getElementsByTagName('input');
    const sliders = Array.from(document.getElementsByClassName('slider') as HTMLCollectionOf<HTMLElement>);
    for (let i = 0; i < btns.length; i++) {
      btns[i].style.cursor = cursor;
    }
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].style.cursor = cursor;
    }
    for (let i = 0; i < htmls.length; i++) {
      htmls[i].style.cursor = cursor;
    }

    for (let i = 0; i < sliders.length; i++) {
      sliders[i].style.cursor = cursor;
    }
  }

  removeBigCursor() {
    const cursor = 'auto';
    const htmls = document.getElementsByTagName('html');
    const btns = document.getElementsByTagName('button');
    const inputs = document.getElementsByTagName('input');
    const sliders = Array.from(document.getElementsByClassName('slider') as HTMLCollectionOf<HTMLElement>);
    for (let i = 0; i < btns.length; i++) {
      btns[i].style.cursor = cursor;
    }
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].style.cursor = cursor;
    }
    for (let i = 0; i < htmls.length; i++) {
      htmls[i].style.cursor = cursor;
    }

    for (let i = 0; i < sliders.length; i++) {
      sliders[i].style.cursor = cursor;
    }
  }
}
