import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { UserService } from 'src/services/user.service';
import { Theme } from '../../models/theme.model';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-selection-theme',
  templateUrl: './selection-theme.component.html',
  styleUrls: [ './selection-theme.component.scss' ]
})
export class SelectionThemeComponent implements OnInit {
  public themeList: Theme[] = [];
  public state: number;
  public currentTheme: Theme;
  public start = 0;
  public end = 4;
  public buttonText = 'Choisissez un thème';
  public selectedUser: User;

  constructor(public themeService: ThemeService, public userService: UserService) {
    this.themeService.themes$.subscribe((theme) => (this.themeList = theme));
    this.themeService.themeSelected$.subscribe((theme) => (this.currentTheme = theme));
    this.userService.userSelected$.subscribe((user) => {
      this.selectedUser = user;
    });
    this.state = 0;
  }

  ngOnInit() {
    // 1. fetch theme list
    // 2. assign theme list fetched into themeList
    console.log('Selection theme : ');
  }

  selectionnerTheme(themeId: string) {
    console.log('Theme selectionne !');
    console.log(themeId);
    // console.log('Patate');
    this.themeService.setSelectedTheme(themeId);
    // console.log(themeId.toString());
    // console.log(this.currentTheme);
    // console.log('fin selection theme !');
    // this.themeService.themeSelected$.subscribe((theme) => this.currentTheme = theme);
    // console.log(this.currentTheme);
    this.state = 2;
    this.buttonText = 'Valider';
  }

  validerTheme() {
    console.log('Theme Valide !');
    console.log(this.currentTheme);
    if (this.state === 2) {
      console.log('theme valide');
      this.state = 1;
    } else {
      console.log('NUL');
    }
  }
  viewNext() {
    this.start = this.start + 4;
    this.end = this.start + 4;
  }
  viewPrevious() {
    this.start = this.start - 4;
    this.end = this.end - 4;
  }

  goToSelectionUser() {
    this.state = 5 ;
  }
}
