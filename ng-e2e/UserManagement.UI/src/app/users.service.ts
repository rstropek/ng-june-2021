import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface User {
  id: string,
  name: string,
  isAdmin: boolean,
  phone: string
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private client: HttpClient) { }

  public getUsers(nameFilter?: string) : Observable<User[]> {
    return this.client.get<User[]>(this.buildUrl(nameFilter));
  }

  private buildUrl(nameFilter: string | undefined) {
    let url = `${environment.apiBase}/api/users`;
    if (nameFilter) {
      url += `?q=${nameFilter}`;
    }

    return url;
  }
}
