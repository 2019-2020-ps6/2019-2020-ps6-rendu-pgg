import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Theme } from '../models/theme.model';
import { BehaviorSubject, ObservableInput, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themes: Theme[];

  // public themes$: BehaviorSubject<Theme[]> = new BehaviorSubject(this.themes);
  public url = 'http://localhost:9428/api/themes';

  constructor(private http: HttpClient) { }


  getThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(this.url).pipe();
  }

  createTheme() { }

  editTheme() { }

  deleteTheme() { }

}
