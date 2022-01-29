const express = require("express");
const mongoose = require("mongoose");
var _ = require("underscore");
const moment = require("moment");
const Sentry = require("../middlewares/requireSentry");
const twitchFunctions = require("../middlewares/twitchFunctions");
require("dotenv").config();
const dotsFunctions = require("src/middlewares/dotsFunctions.js");
const dotsFunctions = require("src/middlewares/dotsFunctions.js");
const dotsFunctions = require("src/middlewares/dotsFunctions.js");
const MJ_APIKEY_PUBLIC = process.env.MJ_APIKEY_PUBLIC;
const MJ_APIKEY_PRIVATE = process.env.MJ_APIKEY_PRIVATE;

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
router.post("/verify-user", async (req, res) => {

  const { verificationToken } = req.body;



  try {

    // Retrieve user object

    const user = await user.findById(req.user._id)

    const verificationId = user.verificationId;



    // Verify user with user object and passed token

    await dotsFunctions.verifyUser(verificationId, verificationToken);

  } catch (err) {

    console.log(err);

  }

});


router.post("/email", async (req, res) => {
  const { name, email, text } = req.body;

  const mailjet = require("node-mailjet").connect(
    MJ_APIKEY_PUBLIC,
    MJ_APIKEY_PRIVATE
  );
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "spencer@qade.io",
          Name: "Spencer",
        },
        To: [
          {
            Email: "spencer@qade.io",
            Name: "Spencer",
          },
          {
            Email: "austin@qade.io",
            Name: "Austin",
          },
        ],
        Subject: "Buffd PH Feedback",
        TextPart: `${text} // SEMT FROM ${name} (${email})`,
        CustomID: "FeedbackForm",
      },
    ],
  });
  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
    });
  const verificationId = await dotsFunctions.createUser(

    email,

    country,

    phone,

    first,

    last,

  );
  const user

  const verificationId = await dotsFunctions.createUser(

    email,

    country,

    phone,

    first,

    last,

  );
  const verificationId = await dotsFunctions.createUser(

    email,

    country,

    phone,

    first,

    last,

  );

  const verificationId = await dotsFunctions.createUser(

    email,

    country,

    phone,

    first,

    last,

  );

  const verificationId = await dotsFunctions.createUser(

    email,

    country,

    phone,

    first,

    last,

  );

  const verificationId = await dotsFunctions.createUser(

    email,

    country,

    phone,

    first,

    last,

  );


  res.send("success");
});

module.exports = router;
