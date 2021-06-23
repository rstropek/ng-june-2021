import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserListComponent } from './users/user-list/user-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NswagUserListComponent } from './users/nswag-user-list/nswag-user-list.component';
import { API_BASE_URL, UsersClientService } from './usersclient.service';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    NswagUserListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: API_BASE_URL, useValue: environment.apiBase },
    UsersClientService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
