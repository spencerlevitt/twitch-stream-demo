const express = require("express");
const mongoose = require("mongoose");
var _ = require("underscore");
const moment = require("moment");
const Sentry = require("../middlewares/requireSentry");
const twitchFunctions = require("../middlewares/twitchFunctions");

const router = express.Router();

router.post("/streams", async (req, res) => {
  const { gameId } = req.body;
  try {
    let allStreams;
    console.log("TWITCH KEY: " + app.get("twitchKey"));
    if (!app.get("twitchKey")) {
      await twitchFunctions.fetchAppToken();
      allStreams = await twitchFunctions.fetchStreamsByGame({ gameId });
    } else {
      allStreams = await twitchFunctions.fetchStreamsByGame({ gameId });
    }

    res.send(allStreams);
  } catch (e) {
    console.log(e);
    Sentry.captureException(e);
    res.status(422).send(e.message);
  }
});

module.exports = router;
