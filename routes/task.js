const Task = class {
  constructor(taskObj) {
    this.title = taskObj.title;
    this.due_date = taskObj.due_date;
    this.description = taskObj.description ? taskObj.description : "";
    this.priority = taskObj.priority ? taskObj.priority : 0;
    this.category_title = taskObj.category_title
      ? taskObj.category_title
      : "my_tasks";
    this.is_done = false;
  }

  getTaskValues() {
    return [
      this.title,
      this.due_date,
      this.description,
      this.priority,
      this.category_title,
      this.is_done,
    ];
  }
};

module.exports = Task;
