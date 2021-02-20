const express = require("express");
const mongoose = require("mongoose");
const _ = require("underscore");
const cron = require("node-cron");

module.exports = {
  start: function () {
    cron.schedule(
      "0 10 * * *",
      () => {
        console.log("Running cron");
      },
      {
        timeZone: "UTC",
      }
    );
  },
};
