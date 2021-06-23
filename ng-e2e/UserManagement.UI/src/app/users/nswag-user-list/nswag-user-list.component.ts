import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, merge, of } from 'rxjs';
import { startWith, debounceTime, switchMap, tap, retry, catchError } from 'rxjs/operators';
import { IUser, UsersClientService } from 'src/app/usersclient.service';

@Component({
  selector: 'app-nswag-user-list',
  templateUrl: './nswag-user-list.component.html',
  styleUrls: ['./nswag-user-list.component.scss']
})
export class NswagUserListComponent {

  userFilter = new FormControl();

  users: Observable<IUser[]>;
  hasError = false;

  private refreshSubject = new Subject<string>();

  constructor(private usersService: UsersClientService) {
    this.users = merge(this.userFilter.valueChanges, this.refreshSubject)
      .pipe(
        startWith(''),
        debounceTime(500),
        switchMap(v => this.usersService.getAll(v).pipe(
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
