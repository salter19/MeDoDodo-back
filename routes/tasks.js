const express = require("express");
const NewTask = require("./new_task.js");
const database = require("./promisecrud.js");

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
    const result = await database.save(req.body);
    res.send(result);
  } catch (e) {
    console.log(e);
    res.end();
  }
});
/*
// get database entry with regex where id is a number
// add possibility for number to be negative value
router.get("/:idNumber(-?[0-9]+)", async (req, res) => {
  try {
    res.send(await database.findById(Number(req.params.idNumber)));
    res.statusCode = 200;
  } catch (err) {
    res.statusCode = 500;
    res.send(err);
  }
});

// post new entry to database
router.post("/", async (req, res) => {
  try {
    res.send(
      await database.save([
        Number(req.body.latitude),
        Number(req.body.longitude),
      ])
    );
    res.statusCode = 201;
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
