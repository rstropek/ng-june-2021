import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoListRepositoryService {

  todoItems: string[] = [
    'Einkaufen',
    '😸 streicheln',
    '🦜 füttern'
  ];

  addItem(newItem: string) {
    this.todoItems.push(newItem);
  }

  deleteItem(ix: number) {
    this.todoItems.splice(ix, 1);
  }

  getItems() {
    return this.todoItems;
  }

  hasItems() {
    return this.todoItems.length > 0;
  }
}
