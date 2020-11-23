const NewTask = class {
  constructor(
    title,
    due_date,
    description = null,
    priority = 0,
    category_id = 1
  ) {
    this._title = title;
    this._due_date = due_date;
    this._descripition = description;
    this._priority = priority;
    this._category_id = category_id;
    this._is_done = false;
  }

  getTaskValues() {
    return [
      this._title,
      this._due_date,
      this._descripition,
      this._priority,
      this._category_id,
      this._is_done,
    ];
  }
};

module.exports = NewTask;
