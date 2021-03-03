const express = require("express");
const mongoose = require("mongoose");
var _ = require("underscore");
const axios = require("axios");
const moment = require("moment");
const GameStreams = mongoose.model("GameStreams");
const { response } = require("express");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = {
  fetchAppToken: async function () {
    let response;
    try {
      response = await axios.post(
        `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_SECRET}&grant_type=client_credentials`
      );
      app.set("twitchKey", response.data.access_token);
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
    let streamCard = await GameStreams.findOne({ gameId: gameId });
    if (!streamCard) {
      streamCard = new GameStreams({
        gameId: gameId,
        streams: [],
        updatedTime: moment.format(),
      });
      await streamCard.save();
    }

    if (
      streamCard.streams.length > 0 &&
      moment(streamCard.updatedTime).isAfter(moment().subtract(30, "minutes"))
    ) {
      return streamCard.streams;
    } else {
      //Check for token expiration and fetch new one if needed
      const tokenVal = await this.validateToken();
      //TODO check twitch doc to see correct param name
      if (!tokenVal.data.status) {
        await this.fetchAppToken();
      }

      //Fetch game streams
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
      streamCard.streams = response.data.data;
      streamCard.updatedTime = moment.format();
      await streamCard.save();
      return response.data.data;
    }
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
