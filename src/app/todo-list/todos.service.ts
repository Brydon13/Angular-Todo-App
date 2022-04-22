import { Todo } from './todo.model';
import { Subject } from 'rxjs';

export interface ICompleteData {
  percentComplete: number;
  incompleteCount: number;
  completeCount: number;
}

export class TodoService {
  private todos: Todo[] = [];

  percentChange = new Subject<ICompleteData>();

  private completionData: ICompleteData = {
    incompleteCount: 0,
    completeCount: 0,
    percentComplete: 100,
  };

  getTodos() {
    return this.todos;
  }
  getCompletionData() {
    return this.completionData;
  }
  calculatePercentComplete() {
    this.completionData.percentComplete =
      (this.completionData.completeCount /
        (this.completionData.completeCount +
          this.completionData.incompleteCount)) *
      100;
    this.percentChange.next(this.completionData);
  }
  addTodo(todo: Todo) {
    this.todos.push(todo);
    this.completionData.incompleteCount++;
    this.calculatePercentComplete();
  }
  changeCompletion(index: number, newStatus: boolean) {
    this.todos[index].completed = newStatus;
    if (newStatus) {
      this.completionData.incompleteCount--;
      this.completionData.completeCount++;
    } else {
      this.completionData.completeCount--;
      this.completionData.incompleteCount++;
    }
    this.calculatePercentComplete();
  }
  setEditing(index: number, newText: string) {
    this.todos[index].editing = !this.todos[index].editing;
    this.todos[index].name = newText;
  }
  removeTodo(index: number) {
    if (this.todos[index].completed) this.completionData.completeCount--;
    else this.completionData.incompleteCount--;
    this.todos.splice(index, 1);
    this.calculatePercentComplete();
  }
}
