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
    this.state = 0;
  }

  ngOnInit() {
    // 1. fetch theme list
   // 2. assign theme list fetched into themeList
    console.log('Selection theme : ');


  }

  selectionnerTheme() {
    this.state = 1;
  }

}
