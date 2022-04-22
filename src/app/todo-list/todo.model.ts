export class Todo {
  public name: string;
  public completed: boolean;
  public editing: boolean;

  constructor(name: string, completed: boolean) {
    this.name = name;
    this.completed = completed;
    this.editing = false;
  }
}
