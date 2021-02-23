const mongoose = require("mongoose");

const gameStreamSchema = new mongoose.Schema(
  {
    gameId: String,
    streams: [],
    updatedTime: String,
  },
  { timestamps: true }
);

mongoose.model("GameStreams", gameStreamSchema);
