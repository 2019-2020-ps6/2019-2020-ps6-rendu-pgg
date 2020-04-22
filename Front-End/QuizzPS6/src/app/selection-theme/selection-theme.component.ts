import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import {Theme} from '../../models/theme.model';

@Component({
  selector: 'app-selection-theme',
  templateUrl: './selection-theme.component.html',
  styleUrls: ['./selection-theme.component.scss']
})
export class SelectionThemeComponent implements OnInit {
  public themeList: Theme[] = [];
  public state: number;
  public currentTheme: Theme;

  constructor(public themeService: ThemeService) {
    this.themeService.themes$.subscribe((theme) => this.themeList = theme);
    this.themeService.themeSelected$.subscribe((theme) => this.currentTheme = theme);
    this.state = 0;
  }

  ngOnInit() {
    // 1. fetch theme list
   // 2. assign theme list fetched into themeList
    console.log('Selection theme : ');
  }

  selectionnerTheme(themeId: number) {
    console.log('Theme selectionne !');
    console.log(themeId);
    // console.log('Patate');
    this.themeService.setSelectedTheme(themeId.toString());
    // console.log(themeId.toString());
    // console.log(this.currentTheme);
    // console.log('fin selection theme !');
    // this.themeService.themeSelected$.subscribe((theme) => this.currentTheme = theme);
    // console.log(this.currentTheme);
    this.state = 2;
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

}
