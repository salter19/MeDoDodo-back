const Task = class {
  constructor(taskObj) {
    this.title = taskObj.title;
    this.due_date = taskObj.due_date;
    this.description = taskObj.description ? taskObj.description : "";
    this.priority = taskObj.priority ? taskObj.priority : 0;
    this.category_id = taskObj.category_id ? taskObj.category_id : 1;
    this.is_done = false;
  }

  getTaskValues() {
    return [
      this.title,
      this.due_date,
      this.description,
      this.priority,
      this.category_id,
      this.is_done,
    ];
  }
};

module.exports = Task;
