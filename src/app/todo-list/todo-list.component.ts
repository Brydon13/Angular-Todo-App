import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from './todo.model';
import { TodoService, ICompleteData } from './todos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  completionData: ICompleteData = {
    percentComplete: 0,
    completeCount: 0,
    incompleteCount: 0,
  };
  private percentSubscription!: Subscription;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
    this.completionData = this.todoService.getCompletionData();
    this.percentSubscription = this.todoService.percentChange.subscribe(
      (newData) => {
        this.completionData = newData;
      }
    );
  }

  ngOnDestroy(): void {
    this.percentSubscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    this.todoService.addTodo(new Todo(form.value.todo, false));
    form.setValue({
      todo: '',
    });
  }
}
