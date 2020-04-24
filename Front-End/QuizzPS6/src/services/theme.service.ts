import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Theme } from '../models/theme.model';
import {BehaviorSubject, ObservableInput, Observable, Subject} from 'rxjs';
import { serverUrl, httpOptionsBase } from '../configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themes: Theme[];
  public themes$: BehaviorSubject<Theme[]> = new BehaviorSubject(this.themes);
  private themeUrl = serverUrl + '/themes';
  private httpOptions = httpOptionsBase;
  private themeSelected: Theme;
  public themeSelected$: BehaviorSubject<Theme> = new BehaviorSubject(this.themeSelected);
  // public url = 'http://localhost:9428/api/themes';

  constructor(private http: HttpClient) {
    this.setThemesFromUrl();
  }

  setSelectedTheme(themeId: string) {
    const urlWithId = this.themeUrl + '/' + themeId;
    this.http.get<Theme>(urlWithId).subscribe((theme) => {
      this.themeSelected$.next(theme);
    });
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
