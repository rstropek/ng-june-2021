import { Component } from '@angular/core';

import { catchError, debounceTime, retry, startWith, switchMap, tap } from "rxjs/operators";
import { FormControl } from '@angular/forms';
import { merge, Observable, of, Subject } from 'rxjs';
import { User, UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  userFilter = new FormControl();

  users: Observable<User[]>;
  hasError = false;

  private refreshSubject = new Subject<string>();

  constructor(private usersService: UsersService) {
    this.users = merge(this.userFilter.valueChanges, this.refreshSubject)
      .pipe(
        startWith(''),
        debounceTime(500),
        switchMap(v => this.usersService.getUsers(v).pipe(
          tap(() => this.hasError = false),
          retry(3),
          catchError(err => {
            this.hasError = true;
            return of([]);
          }))));
  }

  public onRefresh() {
    this.refreshSubject.next(this.userFilter.value);
  }
}
