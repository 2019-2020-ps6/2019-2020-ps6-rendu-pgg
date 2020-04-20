import { Component, OnInit } from '@angular/core';
import { NewQuiz } from '../../../models/quiz.model';
import {Theme} from '../../../models/theme.model';
import {ThemeService} from '../../../services/theme.service';

@Component({
  selector: 'app-quiz-creation',
  templateUrl: './quiz-creation.component.html',
  styleUrls: ['./quiz-creation.component.scss']
})
export class QuizCreationComponent implements OnInit {
  quizObject: NewQuiz;
  selectedTheme: any;
  public themeList: Theme[] = [];
  public state: number;
  public currentTheme: Theme;

  huethemeList: any = [
    {
      id: 1,
      name: 'theme1'
    },
    {
      id: 2,
      name: 'theme2'
    }
  ];

  // 1. Setup a quizz object and get values from textboxe,etc to it
  constructor(public themeService: ThemeService) {
    this.themeService.themes$.subscribe((theme) => this.themeList = theme);
    this.state = 0;
  }

   ngOnInit() {
    this.quizObject = {};
    }
  ajouterQuiz() {
    console.log('selected theme:', this.selectedTheme);
    console.log('quiz:', this.quizObject);
    this.state = 1;
  }


}
