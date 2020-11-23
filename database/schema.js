const schemaTaskObj = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "TaskObject",
  description: "Task object to be saved into database.",
  type: "object",
  properties: {
    title: {
      type: "string",
      minLength: 1,
      maxLength: 254,
      description: "Title of the task",
    },
    due_date: {
      type: "string",
      minLength: 19,
      maxLength: 19,
      description: "Due date of the task",
    },
    description: {
      type: "string",
      maxLength: 254,
      description: "Description of the task",
    },
    priority: {
      type: "number",
      minimum: 0,
      maximum: 3,
      description: "Priority value of the task - higher means higher",
    },
    category_id: {
      type: "integer",
      minimum: 1,
      description: "Category ID of the task",
    },
  },
  required: ["title", "due_date"],
};

const schemas = { schemaTaskObj };
module.exports = schemas;
