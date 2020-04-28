import { Injectable } from '@angular/core';
import { BehaviorSubject, ObservableInput, Observable } from 'rxjs';
import { User } from '../models/user.model';
// import { USER_LIST } from '../mocks/user-list.mock';
import { HttpClient } from '@angular/common/http';
import { httpOptionsBase } from 'src/configs/server.config';
import { Attempt } from 'src/models/attempt.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

   /**
    * The list of quiz.
    * The list is retrieved from the mock.
    */
  private users: User[];
  public userSelected: User;

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public users$: BehaviorSubject<User[]> = new BehaviorSubject(this.users);
  public userSelected$: BehaviorSubject<User> = new BehaviorSubject(this.userSelected);
  public url = 'http://localhost:9428/api/users';
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.setUsersFromUrl();
  }

  setSelectedUser(userId: string) {
    const urlWithId = this.url + '/' + userId;
    return this.http.get<User>(urlWithId).subscribe((user) => {
      this.userSelected$.next(user);
    });
  }

  addUser(user: User) {
    const parsed = JSON.parse(JSON.stringify(user));
    delete parsed.attempts;
    return this.http.post<User>(this.url, parsed, this.httpOptions).subscribe( () => this.setUsersFromUrl());
  }

  deleteUser(user: User) {
    console.log('Deleting user...');
    this.http.delete<User>(this.url + '/' + user.id).subscribe( (users) => {
      console.log( 'success' );
    });
  }

  addAttempt(user: User, attempt: Attempt) {
    return this.http.post<User>(this.url + '/' + user.id + '/attempts', attempt, this.httpOptions).subscribe( () => this.setUsersFromUrl());
  }

  setUsersFromUrl() {
    return this.http.get<User[]>(this.url).subscribe((users) => {
      this.users = users;
      this.users$.next(this.users);
      console.log(this.users);
    });
  }
}
