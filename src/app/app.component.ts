import { Component } from '@angular/core';
import { DataStore } from '@aws-amplify/datastore';
import { Todo } from '../models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-app';
  todos = [];

  async ngOnInit(){
    this.getTodos();
  }

  async createTodo(){
    await DataStore.save(
      new Todo({
      "name": "Lorem ipsum dolor sit amet",
      "description": "Lorem ipsum dolor sit amet"
      })
    );
  }

  async getTodos(){
    this.todos = await DataStore.query(Todo);
  }

}
