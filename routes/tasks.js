const express = require("express");
const path = require("path");
const sqlString = require("sqlstring");
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

// search tasks that have due_date in certain week number
router.get("/week/:weekNumber(-?[0-9]+)", async (req, res) => {
  try {
    // res.send(req.params.weekNumber);
    res.send(await database.findTasksByWeek(req.params.weekNumber));
    res.statusCode = 200;
  } catch (err) {
    res.statusCode = 500;
    res.send(err);
  }
});

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

// get all categories
router.get('/categorytitles', async (req, res) => {
  try {
    const result = await database.getCategorytitles();
    res.send(result)
  } catch (error) {
    res.statusCode = 500;
    res.send(`${error}`)
  }
})

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

/*



// filter results according to latitude values
router.get(
  "/filter/latitude/min=:latmin(-?[0-9]+)max=:latmax(-?[0-9]+)",
  async (req, res) => {
    try {
      res.send(
        await database.filterLatitude(
          Number(req.params.latmin),
          Number(req.params.latmax)
        )
      );
    } catch (err) {
      res.statusCode = 500;
      res.end();
    }
  }
);

// filter results according to longitude values
router.get(
  "/filter/longitude/min=:lonmin(-?[0-9]+)max=:lonmax(-?[0-9]+)",
  async (req, res) => {
    try {
      res.send(
        await database.filterLongitude(
          Number(req.params.lonmin),
          Number(req.params.lonmax)
        )
      );
    } catch (err) {
      res.statusCode = 500;
      res.end();
    }
  }
);

// filter results according to longitude values
router.get(
  "/sort/:latOrLon(((lat|long)itude)?)/:orderBy(((de|a)sc)?)",
  async (req, res) => {
    try {
      res.send(await database.sortBy(req.params.latOrLon, req.params.orderBy));
    } catch (err) {
      res.statusCode = 500;
      res.end();
    }
  }
);
*/

module.exports = router;
