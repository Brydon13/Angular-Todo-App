import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from '../todo.model';
import { TodoService } from '../todos.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  @Input() index!: number;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  changeStatus(form: NgForm) {
    this.todoService.changeCompletion(this.index, form.value.status);
  }
  setEdit(form: NgForm) {
    let newText: string = '';
    if (this.todo.editing) newText = form.value.editText;
    else newText = this.todo.name;
    this.todoService.setEditing(this.index, newText);
  }
  removeHandler() {
    this.todoService.removeTodo(this.index);
  }
}
