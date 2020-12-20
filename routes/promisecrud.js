const mysql = require("mysql");
const path = require("path");
// const config = require(path.join(__dirname, "./configuration.js"));
const config = require(path.join(__dirname, "./config.js"));
const Task = require(path.join(__dirname, "./task"));
const Schemas = require(path.join(__dirname, "./../database/schema"));
const Validator = require("jsonschema").Validator;
const schemaValidation = new Validator();

config.connectionLimit = 10;

let connection = null;
// ----
// Set of helper functions
const validateTaskInput = (taskObj) => {
  const res = schemaValidation.validate(taskObj, Schemas.schemaTaskObj);
  return res.errors.length < 1 ? true : false;
};
const getKeys = (task) => {
  const result = [];
  for (const key in task) {
    result.push(key);
  }
  return result;
};
const getQuestionMarks = (task) => {
  const mark = "?";
  let result = ``;
  Object.keys(task).map((key) => (result += `${mark}, `));

  // remove comma and space from the end
  result = result.substring(0, result.length - 5);
  return result;
};
const getValues = (task) => {
  const result = [];
  for (const value of Object.values(task)) {
    result.push(value);
  }
  return result;
};
const isCategoryTitle = async (title) => {
  const allCategories = await connectionFunctions.getCategories();
  let isValid = false;

  for (const data of allCategories) {
    if (data.title === title) {
      isValid = true;
    }
  }
  return isValid;
};
const getCatID = async (title) => {
  const allCategories = await connectionFunctions.getCategories();
  let catID;
  for (const data of allCategories) {
    if (data.title === title) {
      catID = data.id;
    }
  }
  return catID;
};
const getCatLength = async (id) => {
  const taskAmount = await connectionFunctions.findByCatId(id);
  const catLength = taskAmount.length;
  return catLength;
};
const saveNewCategory = async (title) => {
  try {
    const newCatID = await connectionFunctions.saveCategory(title);
    return newCatID;
  } catch (e) {
    console.log(`${400} - Invalid insert, could not create new category`);
  }
};
// ----
const connectionFunctions = {
  connect: () => {
    function someFunc(resolve, reject) {
      if (connection) {
        reject("You are already connected.");
      } else {
        // create connectionPool instead of mysql.createConnection(config)
        connection = mysql.createPool(config);
        resolve("Connected succesfully.");
      }
    }
    return new Promise(someFunc);
  },
  close: () => {
    function someFunc(resolve, reject) {
      if (connection) {
        connection.end(resolve("Connection ended"));
      } else {
        reject("There aren't any connections to close. Please connect first.");
      }
    }
    return new Promise(someFunc);
  },
  findAll: () => {
    function someFunc(resolve, reject) {
      if (connection) {
        connection.query("select * from tasks", (err, result) => {
          if (err) {
            reject(err);
          }
          if (result.length > 0) {
            const entries = JSON.parse(JSON.stringify(result));
            resolve(entries);
          }
        });
      } else {
        reject("Please connect first to get the entries.");
      }
    }
    return new Promise(someFunc);
  },
  findTasksByWeek: (weekNumber, year) => {
    function someFunc(resolve, reject) {
      if (connection) {
        if (Number(weekNumber) > 0 && Number(weekNumber) < 54) {
          const sql =
            "SELECT * FROM tasks WHERE WEEK(due_date, 3) = ? AND YEAR(due_date) = ? ORDER BY due_date ASC";
          connection.query(sql, [weekNumber, year], (err, tasks) => {
            if (err) {
              reject(err);
            }
            const entries = JSON.parse(JSON.stringify(tasks));
            resolve(entries);
          });
        } else {
          reject("The given week number is not valid.");
        }
      } else {
        reject("Please connect first to get the entries.");
      }
    }
    return new Promise(someFunc);
  },

  saveTask: (input) => {
    const someFunc = async (resolve, reject) => {
      const createNewTask = () => {
        validateTaskInput(input)
          ? (async () => {
              const task = new Task(input);
              const isCategory = await isCategoryTitle(task.category_title);
              let catID;

              // set catID based on whether it exists or new is created
              isCategory
                ? (catID = await getCatID(task.category_title))
                : (catID = await saveNewCategory(task.category_title));

              if (isCategory) {
                catID = await getCatID(task.category_title);
              } else {
                const tmp = await saveNewCategory(task.category_title);

                if (tmp) {
                  catID = tmp;
                } else {
                  catID = await getCatID(task.category_title);
                }
              }
              
              // set catID into Task object as well
              task.setCategoryID(Number(catID));

              // variables needed in the query
              const keys = getKeys(task.getTaskItems());
              const questionMarks = getQuestionMarks(task);
              const values = getValues(task.getTaskItems());

              const sql = `INSERT INTO tasks(${keys}) VALUES(${questionMarks})`;

              connection.query(sql, values, (err, res) => {
                err
                  ? reject(`${400} - Invalid input in query, task not saved.`)
                  : resolve(`${201} - Created. ID: ${res.insertId}`);
              });
            })()
          : reject(`${400} - Incorrect input, cannot save task`);
      };

      // check that connection is up
      connection
        ? createNewTask()
        : reject(`${500} - No connection, cannot save task.`);
    };

    return new Promise(someFunc);
  },

  updateTask: async(id, key, value) => {

    return new Promise(someFunc);
  }

  getCategories: async () => {
    const someFunc = (resolve, reject) => {
      const getData = () => {
        const sql = "SELECT * FROM categories";

        connection.query(sql, (err, res) => {
          if (err) {
            reject(`${400} - Invalid input could not retrieve categories`);
          } else {
            if (res.length > 0) {
              const cat = JSON.parse(JSON.stringify(res));
              resolve(cat);
            }
          }
        });
      };

      connection
        ? getData()
        : reject(`${500} - No connection. Cannot retrieve categories.`);
    };
    return new Promise(someFunc);
  },
  getCategorytitles: async () => {
    const someFunc = (resolve, reject) => {
      const getData = () => {
        const sql = "SELECT title FROM categories";

        connection.query(sql, (err, res) => {
          const result = JSON.parse(JSON.stringify(res));

          err
            ? reject(
                `${404} - Not found. Something went wrong and no category titles were found.`
              )
            : resolve(result);
        });
      };
      connection
        ? getData()
        : reject(`${500} - No connection. Could not retrieve category titles.`);
    };
    return new Promise(someFunc);
  },
  saveCategory: async (_title) => {
    
    const someFunc = async (resolve, reject) => {
      const createNewCategory = () => {
        const sql = `INSERT INTO categories(title) VALUES(?)`;
        connection.query(sql, _title.title, (err, res) => {
          err
            ? reject(`${400} - Invalid input, could not create new category.`)
            : resolve(`${res.insertId}`);
        });
      };
      connection
        ? createNewCategory()
        : reject(`${500} - No connection, cannot save category.`);
    };
    return new Promise(someFunc);
  },
  findByCat: (title) => {
    const someFunc = (resolve, reject) => {
      const findTasks = async () => {
        const getTasks = async (title) => {
          const catID = await getCatID(title);
          const sql = `SELECT * FROM tasks WHERE category_id = ${catID}`;

          connection.query(sql, (err, res) => {
            const tasks = JSON.parse(JSON.stringify(res));
            err
              ? reject(`${404} - Not Found, no such category.`)
              : resolve(tasks);
          });
        };
        const isCategory = await isCategoryTitle(title);
        isCategory
          ? getTasks(title)
          : reject(`${404} - Not found, no such category exists.`);
      };

      connection
        ? findTasks()
        : reject(`${500} - No connection, cannot search through categories.`);
    };

    return new Promise(someFunc);
  },
  findByCatId: (id) => {
    const someFunc = (resolve, reject) => {
      const findTasks = async () => {
        const sql = `SELECT * FROM tasks WHERE category_id = ${id}`;
        connection.query(sql, (err, res) => {
          const tasks = JSON.parse(JSON.stringify(res));
          err
            ? reject(`${404} - Not Found, no such category.`)
            : resolve(tasks);
        });
      };

      connection
        ? findTasks()
        : reject(`${500} - No connection, cannot search through categories.`);
    };

    return new Promise(someFunc);
  },

  findById: (id) => {
    const someFunc = (resolve, reject) => {
      const findTask = async () => {
        const sql = `SELECT * FROM tasks WHERE id =?`;

        try {
          connection.query(sql, id, (err, res) => {
            err
              ? reject(`${400} - Invalid input, could not find task.`)
              : resolve(JSON.parse(JSON.stringify(res)));
          });
        } catch (e) {
          reject(`${400} - Invalid input, could not find task.`);
        }
      };

      connection
        ? findTask()
        : reject(`${500} - No connection, cannot find task.`);
    };
    return new Promise(someFunc);
  },

  deleteById: (id) => {
    function someFunc(resolve, reject) {
      if (connection) {
        // if id is fine proceed to query
        const sql = `DELETE FROM tasks WHERE id =?`;
        connection.query(sql, id, (err, result) => {
          if (err) {
            reject(err);
          }
          // check if deletion affected any rows and something was actually removed
          if (result.affectedRows === 0) {
            reject(`Id ${id} not found. Couldn't delete it.`);
          } else {
            // some rows were changed so deletion was done
            resolve("Success, deleted id " + id);
          }
        });
      } else {
        reject("Can't delete id " + id + ". There is no connection.");
      }
    }
    return new Promise(someFunc);
  },
  deleteCategoryById: (id) => {
    function someFunc(resolve, reject) {
      const findTask = async () => {
        try {
          const tasksInCategory = await getCatLength(id);
          // check that category is empty and
          // default category can't be removed
          if (tasksInCategory === 0 && id !== 1) {
            const sql = `DELETE FROM categories WHERE id =?`;
            connection.query(sql, id, (err, result) => {
              if (err) {
                reject(err);
              }
              // check if deletion affected any rows and something was actually removed
              if (result.affectedRows === 0) {
                reject(`Category with id ${id} not found. Couldn't delete it.`);
              } else {
                // some rows were changed so deletion was done
                resolve("Success, deleted category with id " + id);
              }
            });
          } else {
            reject(
              `Couldn't delete category.\nIt is not empty or it is the default category.`
            );
          }
        } catch (e) {
          reject(`${400} - Invalid input, could not find category.`);
        }
      };

      connection
        ? findTask()
        : reject(`${500} - No connection, cannot delete category.`);
    }
    return new Promise(someFunc);
  },

  /*

  filterLatitude: (min, max) => {
    function someFunc(resolve, reject) {
      if (connection) {
        // sql query for filtering latitude values
        connection.query(
          "SELECT * FROM locations WHERE latitude >= ? AND latitude <= ?",
          [min, max],
          (err, results) => {
            if (err) {
              reject(err);
            }

            resolve("Filtered values are\n" + JSON.stringify(results));
          }
        );
      } else {
        reject("No connection. Can't filter results");
      }
    }
    return new Promise(someFunc);
  },

  filterLongitude: (min, max) => {
    function someFunc(resolve, reject) {
      if (connection) {
        // sql query for filtering longitude values
        connection.query(
          "SELECT * FROM locations WHERE longitude >= ? AND longitude <= ?",
          [min, max],
          (err, results) => {
            if (err) {
              reject(err);
            }
            resolve("Filtered values are\n" + JSON.stringify(results));
          }
        );
      } else {
        reject("No connection. Can't filter results");
      }
    }
    return new Promise(someFunc);
  },

  sortBy: (latOrLon, orderBy) => {
    function someFunc(resolve, reject) {
      if (connection) {
        if (orderBy === "desc" || orderBy === "asc") {
          const sql =
            "SELECT * FROM locations ORDER BY " + latOrLon + " " + orderBy;
          // sql query for sorting values
          connection.query(sql, (err, results) => {
            if (err) {
              reject(err);
            }
            resolve("Sorted values are\n" + JSON.stringify(results));
          });
        } else {
          reject("Sorting order is not defined.");
        }
      } else {
        reject("No connection. Can't filter results");
      }
    }
    return new Promise(someFunc);
  },
  */
};

module.exports = connectionFunctions;
