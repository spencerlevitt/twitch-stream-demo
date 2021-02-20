const express = require("express");
const mongoose = require("mongoose");
var _ = require("underscore");
const axios = require("axios");
const moment = require("moment");
const axios = require("axios");
const { response } = require("express");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = {
  fetchAppToken: async function () {
    let response;
    try {
      response = await axios.get(
        `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_SECRET}&grant_type=client_credentials`
      );
      app.get("twitchKey") = response.access_token;
      console.log("TWITCH TOKEN SAVED: " + app.get("twitchKey"));
    } catch (e) {
      console.log(e);
    }
    return response;
  },
  validateToken: async function () {
    let response;
    try {
      response = await axios.get(`https://id.twitch.tv/oauth2/validate`, {
        headers: {
          Authorization: `OAuth ${app.get("twitchKey")}`,
        },
      });
    } catch (e) {
      console.log(e);
    }
    return response;
  },
  fetchTopGames: async function () {
    let response;
    try {
      response = await axios.get(`https://api.twitch.tv/helix/games/top`, {
        headers: {
          Authorization: `Bearer ${app.get("twitchKey")}`,
          "Client-Id": process.env.TWITCH_CLIENT_ID,
        },
      });
    } catch (e) {
      console.log(e);
    }
    return response;
  },
  fetchStreamsByGame: async function ({ gameId }) {
    let response;
    try {
      response = await axios.get(
        `https://api.twitch.tv/helix/streams?first=100&game_id=${gameId}`,
        {
          headers: {
            Authorization: `Bearer ${app.get("twitchKey")}`,
            "Client-Id": process.env.TWITCH_CLIENT_ID,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
    return response;
  },
  fetchStreams: async function () {
    let response;
    try {
      response = await axios.get(
        `https://api.twitch.tv/helix/streams?first=100`,
        {
          headers: {
            Authorization: `Bearer ${app.get("twitchKey")}`,
            "Client-Id": process.env.TWITCH_CLIENT_ID,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
    return response;
  },
};
