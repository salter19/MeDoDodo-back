const mysql = require("mysql");
const config = require("./config.js");
const Task = require("./task");
const Schemas = require("./../database/schema");
const Validator = require("jsonschema").Validator;
const schemaValidation = new Validator();

config.connectionLimit = 10;

let connection = null;

const validateTaskObj = (taskObj) => {
  const res = schemaValidation.validate(taskObj, Schemas.schemaTaskObj);
  return res.errors.length < 1 ? true : false;
};

const getKeys = (taskObj) => {
  let result = `${Object.keys(taskObj)[0]}, ${Object.keys(taskObj)[1]}`;

  if (Object.keys(taskObj).length > 2) {
    for (let i = 2; i < Object.keys(taskObj).length; i++) {
      result += `, ${Object.keys(taskObj)[i]}`;
    }
  }
  return result;
};

const getValues = (taskObj) => {
  const mark = "?";
  let result = ``;
  Object.keys(taskObj).map((key) => (result += `${mark}, `));
  result = result.substring(0, result.length - 2);

  return result;
};

const isCategoryTitle = async (title) => {
  const allCategories = await connectionFunctions.getCategories();
  let isValid = false;

  for (let data of allCategories) {
    console.log(data.title);
    data.title === title ? (isValid = true) : (isValid = false);
  }
  return isValid;
};

const getCatID = async (title) => {
  const allCategories = await connectionFunctions.getCategories();
  let catID;
  for (let data of allCategories) {
    if (data.title === title) {
      catID = data.id;
    }
  }
  return catID;
};
const saveNewCategory = async (title) => {
  try {
    const newCatID = await connectionFunctions.saveCategory(title);
    console.log("new ID: " + newCatID);
    return newCatID;
  } catch (e) {
    console.log(`${400} - Invalid insert, could not create new category`);
  }
};
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
        connection.query("select * from tasks", (err, tasks) => {
          if (err) {
            reject(err);
          }
          const entries = JSON.parse(JSON.stringify(tasks));
          resolve(entries);
        });
      } else {
        reject("Please connect first to get the entries.");
      }
    }
    return new Promise(someFunc);
  },

  saveTask: (taskObj) => {
    const someFunc = async (resolve, reject) => {
      const createNewTask = () => {
        // validate given task object
        validateTaskObj(taskObj)
          ? (async () => {
              // create new Task object
              const task = new Task(taskObj);

              const isCategory = await isCategoryTitle(task.category_title);
              let catID;

              isCategory
                ? (catID = await getCatID(task.category_title))
                : (catID = await saveNewCategory(task.category_title));

              const sql = `INSERT INTO tasks(${getKeys(
                task
              )}) VALUES(${getValues(task)})`;

              connection.query(
                sql,
                task.getTaskValues(),
                (err, res, fields) => {
                  err
                    ? reject(`${400} - Invalid input, task not saved.`)
                    : resolve(`${201} - Created. ID: ${res.insertId}`);
                }
              );
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
  getCategories: async () => {
    const someFunc = (resolve, reject) => {
      const getData = () => {
        const sql = "SELECT * FROM categories";

        connection.query(sql, (err, res, fields) => {
          const cat = JSON.parse(JSON.stringify(res));
          err
            ? reject(`${400} - Invalid input, could not retrieve categories`)
            : resolve(cat);
        });
      };

      connection
        ? getData()
        : reject(`${500} - No connection. Cannot retrieve categories.`);
    };
    return new Promise(someFunc);
  },

  saveCategory: async (_title) => {
    console.log("inside saveNewCategory");
    const someFunc = async (resolve, reject) => {
      const createNewCategory = () => {
        const sql = `INSERT INTO categories(title) VALUES(?)`;
        connection.query(sql, _title, (err, res) => {
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
  /*
  save: (location) => {
    function someFunc(resolve, reject) {
      if (connection) {
        // sql query for inserting values to locations
        connection.query(
          "INSERT INTO locations (latitude, longitude) VALUES (?,?)",
          location,
          (err, results) => {
            if (err) {
              reject(err);
            }

            resolve("Successfully inserted values. Id is " + results.insertId);
          }
        );
      } else {
        reject("You have no connection. Can't save new location.");
      }
    }
    return new Promise(someFunc);
  },
  deleteById: (id) => {
    function someFunc(resolve, reject) {
      if (connection) {
        // if id is fine proceed to query
        connection.query(
          "DELETE FROM locations WHERE id =?",
          id,
          (err, result) => {
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
          }
        );
      } else {
        reject("Can't delete id " + id + ". There is no connection.");
      }
    }
    return new Promise(someFunc);
  },
  findById: (id) => {
    function someFunc(resolve, reject) {
      if (connection) {
        // if id is fine proceed to query
        connection.query(
          "SELECT * FROM locations WHERE id =?",
          id,
          (err, locations) => {
            if (err) {
              reject(err);
            }
            if (locations.length === 0) {
              reject(
                `Could not find id ${id}. Maybe it has been deleted or it doesn't exist.`
              );
            } else {
              resolve(
                "Id " + id + " found:\n" + JSON.stringify(locations)
                // `Id ${id} was found!\nid: ${locations[0].id}, latitude: ${locations[0].latitude}, longitude: ${locations[0].longitude}`
              );
            }
          }
        );
      } else {
        reject("No connection. Can't find id " + id);
      }
    }
    return new Promise(someFunc);
  },

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
