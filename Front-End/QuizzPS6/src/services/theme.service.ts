import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Theme } from '../models/theme.model';
import { BehaviorSubject, ObservableInput, Observable } from 'rxjs';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
// import {THEME_LIST} from '../../../../back-end/mocks/theme-list.mock';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themes: Theme[];
  public themes$: BehaviorSubject<Theme[]> = new BehaviorSubject(this.themes);
  private themeUrl = serverUrl + '/themes';
  private httpOptions = httpOptionsBase;
  // public url = 'http://localhost:9428/api/themes';

  constructor(private http: HttpClient) {
    this.setThemesFromUrl();
  }

  setThemesFromUrl() {
    return this.http.get<Theme[]>(this.themeUrl).subscribe((themeList) => {
      this.themes = themeList;
      this.themes$.next(this.themes);
      console.log(this.themes);
    });
  }

  createTheme(theme: Theme) {
    this.http.post<Theme>(this.themeUrl, theme, this.httpOptions).subscribe(() => this.setThemesFromUrl());
  }

  editTheme() { }

  deleteTheme(theme: Theme) {
    const urlWithId = this.themeUrl + '/' + theme.id;
    this.http.delete<Theme>(urlWithId, this.httpOptions).subscribe(() => this.setThemesFromUrl());
  }

}
