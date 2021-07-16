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
  count: number;
  keys = [];

  async ngOnInit(){
    this.getTodos();
    
  }

  async createTodo(name:string, todoitem:string){
    await DataStore.save(
      new Todo({
      "name": name,
      "description": todoitem
      })
    );

    this.getTodos();
  }

  async deleteTodo(id: string){
    console.log(id);
    const todoDelete = await DataStore.query(Todo, id);
    DataStore.delete(todoDelete);

    this.getTodos();
  }

  async getTodos(){
    this.todos = await DataStore.query(Todo);
    this.keys = Object.keys(this.todos[0]);
    this.count = this.todos.length;
  }

  async searchTodos(search: string){
    const searchTodos = await DataStore.query(Todo, t => t.description("contains", search));
    this.todos = searchTodos;
    this.count = this.todos.length;
  }

}
