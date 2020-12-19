const Task = class {
  constructor(taskObj) {
    this.title = taskObj.title;
    this.due_date = taskObj.due_date;
    this.description = taskObj.description ? taskObj.description : "";
    this.priority = taskObj.priority ? taskObj.priority : 0;

    this.category_title = taskObj.category_title
      ? taskObj.category_title
      : "my_tasks";
    this.category_id = 1;
    this.is_done = false;
  }

  getTaskItems() {
    return {
      title: this.title,
      due_date: this.due_date,
      description: this.description,
      priority: this.priority,
      category_id: this.category_id,
      is_done: this.is_done,
    };
  }

  setCategoryID(_id) {
    this.category_id = _id;
  }

  getCategoryID() {
    return this.category_id;
  }
};

module.exports = Task;
