const { Date } = require("core-js");
const mongoose = require("mongoose");
const { number } = require("yargs");
const Schema = mongoose.Schema;
// Define collection and schema
let Comic = new Schema(
  {
    name: {
      type: String,
    },
    ordinal: {
      type: String,
    },
    edition: {
      type: String,
    },
    publisher: {
      type: String,
    },
    comic: {
      type: String,
    },

    dateAdded: {
      type: Date,
    },
    dateIssued: {
      type: Date,
    },
    redni: {
      type: Number,
    },
  },
  {
    collection: "comics",
  }
);
module.exports = mongoose.model("Comic", Comic);
