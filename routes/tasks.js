const express = require("express");
const path = require("path");
const database = require(path.join(__dirname, "./promisecrud.js"));

// create router
const router = express.Router();
router.use(express.json());

// get all entries from database
router.get("/", async (req, res) => {
  try {
    res.send(await database.findAll());
  } catch (err) {
    res.statusCode = 500;
    res.end();
  }
});

// save a task into database
router.post("/", async (req, res) => {
  try {
    const result = await database.saveTask(req.body);
    res.send(result);
  } catch (e) {
    console.log(e);
    res.end();
  }
});

// save new category
router.post("/category/", async (req, res) => {
  try {
    const result = await database.saveCategory(req.body);
    res.send(result);
  } catch (e) {
    console.log(e);
    res.end();
  }
});

// modify task
router.put(
  "/modify/:idNumber([0-9]+)", 
  async (req, res) => {
    try {
      const result = await database.updateTask(req.params.idNumber, req.body.key, req.body.value);

      res.send(`get task : ${result}`);
    } catch (error) {
      console.log('something went wrong w/ route - get\n' + error)
    } 
  }
);

// search tasks that have due_date in certain week number and year
router.get(
  "/week/:weekNumber([0-9]{1,2})/:yearIs(2[0-9]{3})",
  async (req, res) => {
    try {
      res.send(
        await database.findTasksByWeek(req.params.weekNumber, req.params.yearIs)
      );
      res.statusCode = 200;
    } catch (err) {
      res.statusCode = 500;
      res.send(err);
    }
  }
);

// to include spaces in titles use % sign in express get statement
// and %20 in the curl where spaces should be
router.get("/category/:catTitle([0-9a-zA-Z_%]+)", async (req, res) => {
  try {
    const result = await database.findByCat(req.params.catTitle);
    res.statusCode = 200;
    res.send(result);
  } catch (error) {
    res.statusCode = 500;
    res.send(`${error}`);
  }
});

// finding category with id
router.get("/category/id/:catId([0-9]+)", async (req, res) => {
  try {
    const result = await database.findByCatId(Number(req.params.catId));
    res.statusCode = 200;
    res.send(result);
  } catch (error) {
    res.statusCode = 500;
    res.send(`${error}`);
  }
});

// get all category titles
router.get("/categorytitles", async (req, res) => {
  try {
    const result = await database.getCategorytitles();
    res.send(result);
  } catch (error) {
    res.statusCode = 500;
    res.send(`${error}`);
  }
});

// get all categories
router.get("/categories", async (req, res) => {
  try {
    const result = await database.getCategories();
    res.send(result);
  } catch (error) {
    res.statusCode = 500;
    res.send(`${error}`);
  }
});

// get database entry with regex where id is a number
router.get("/:idNumber([0-9]+)", async (req, res) => {
  try {
    res.send(await database.findById(Number(req.params.idNumber)));
    res.statusCode = 200;
  } catch (err) {
    res.statusCode = 500;
    res.send(err);
  }
});

// delete entry from database
router.delete("/:idNumber(-?[0-9]+)", async (req, res) => {
  try {
    await database.deleteById(Number(req.params.idNumber));
    res.statusCode = 204;
    res.end();
  } catch (err) {
    res.statusCode = 500;
    res.end();
  }
});

// delete category from database
router.delete("/category/:idNumber(-?[0-9]+)", async (req, res) => {
  try {
    await database.deleteCategoryById(Number(req.params.idNumber));
    res.statusCode = 204;
    res.end();
  } catch (err) {
    res.statusCode = 500;
    res.end();
  }
});

module.exports = router;
