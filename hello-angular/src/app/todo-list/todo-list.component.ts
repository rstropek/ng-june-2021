import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TodoListRepositoryService } from '../todo-list-repository.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {

  constructor(public repository: TodoListRepositoryService, private client: HttpClient) {}

  newItem: string = '';

  addItem() {
    this.repository.addItem(this.newItem);
    this.newItem = '';

    var myGetRequest = this.client.get<any>('https://myserver.com/api/todo');

  }

  deleteItem(ix: number) {
    this.repository.deleteItem(ix);
  }
}
