const Schemas = require("../database/schema");
const Validator = require("jsonschema").Validator;
const schemaValidation = new Validator();

const validateCategory = (category) => {
  const res = schemaValidation.validate(category, Schemas.schemaCategory);
  return res.errors.length < 1 ? true : false;
};

const Category = class {
  Constructor(_title) {
    this.title = _title;

    (() => {
      validateCategory(this)
        ? console.log(`${201} - Created: new Category`)
        : console.log(`${400} - Invalid input, could not create Category.`);
    })();
  }
};
