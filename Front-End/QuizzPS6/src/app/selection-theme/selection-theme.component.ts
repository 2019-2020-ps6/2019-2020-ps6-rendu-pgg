import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-selection-theme',
  templateUrl: './selection-theme.component.html',
  styleUrls: ['./selection-theme.component.scss']
})
export class SelectionThemeComponent implements OnInit {
  themeList: any[];
  constructor(public themeService: ThemeService) {}

  ngOnInit() {
    // 1. fetch theme list
   // 2. assign theme list fetched into themeList
    this.themeService.getThemes().subscribe((listItem) => {
      this.themeList = listItem;


    }, err => {
      console.log(err);
    });


    console.log('test');


  }

}
