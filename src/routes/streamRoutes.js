const express = require("express");
const mongoose = require("mongoose");
var _ = require("underscore");
const moment = require("moment");
const Sentry = require("../middlewares/requireSentry");

const router = express.Router();

router.post("/streams", async (req, res) => {
  try {
    console.log("streams");
  } catch (e) {
    console.log(e);
    Sentry.captureException(e);
    res.status(422).send(e.message);
  }
});

module.exports = router;
