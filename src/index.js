require("./models/GameStreams");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const Sentry = require("./middlewares/requireSentry");
const _ = require("underscore");
const Bottleneck = require("bottleneck");
const streamRoutes = require("./routes/streamRoutes");
const cors = require("cors");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app = express();
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log("Listening on port" + PORT);
});

app.set("twitchKey", null);

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 15000,
  id: "twitch",
});
app.set("limiter", limiter);

app.use(Sentry.Handlers.requestHandler());

app.use(cors());

/*app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,Authorization,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  // Add this
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, POST, PATCH, DELETE, OPTIONS"
    );
    res.header("Access-Control-Max-Age", 120);
    return res.status(200).json({});
  }
  next();
});*/

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.use(bodyParser.json());
app.use(streamRoutes);

app.use(
  Sentry.Handlers.errorHandler({
    shouldHandleError(error) {
      // Capture all 404 and 500 errors
      if (error) {
        return true;
      }
      return false;
    },
  })
);

const mongoUri = process.env.MONGO_KEY;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

//cronJobs.start();
