const mysql = require("mysql");
const config = require("./config.js");
const newTask = require("./new_task");

config.connectionLimit = 10;

let connection = null;

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

  save: (taskObj) => {
    console.log("Hello there");

    const someFunc = async (resolve, reject) => {
      const createNewTask = () => {
        resolve(Object.keys(taskObj));
      };
      connection
        ? createNewTask()
        : reject(`${500} - No connection, cannot save task.`);
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
