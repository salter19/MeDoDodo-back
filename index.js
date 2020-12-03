const path = require("path");
const database = require(path.join(__dirname, "./routes/promisecrud.js"));
const tasks = require(path.join(__dirname, "./routes/tasks.js"));
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

// connecting front to backend
app.use(express.static("frontend/build"));

const port = process.env.PORT || 8080;

// connect router to app
app.use("/tasks", tasks);

// open server and catch errors
const server = app.listen(port, async () => {
  try {
    await database.connect();
    console.log(`Listening on port ${server.address().port}`);
  } catch (err) {
    console.log(err);
    server.close();
  }
});
