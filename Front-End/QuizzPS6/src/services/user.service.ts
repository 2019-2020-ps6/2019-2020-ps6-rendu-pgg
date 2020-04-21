import { Injectable } from '@angular/core';
import { BehaviorSubject, ObservableInput, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { USER_LIST } from '../mocks/user-list.mock';
import { HttpClient } from '@angular/common/http';

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
  private users: User[] = USER_LIST;

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public users$: BehaviorSubject<User[]> = new BehaviorSubject(this.users);
  public url = 'http://localhost:9428/api/users';

  constructor(private http: HttpClient) {
    this.setUsersFromUrl();
  }

  addUser(user: User) {
    this.users.push(user);
    this.users$.next(this.users);
    console.log(user);

  }

  deleteQuiz(user: User) {
    const index = this.users.indexOf(user);
    if (index > -1) {
      this.users.splice(index, 1);
    }
  }

  setUsersFromUrl() {
    return this.http.get<User[]>(this.url).subscribe((users) => {
      this.users = users;
      this.users$.next(this.users);
      console.log(this.users);
    });
  }
}
