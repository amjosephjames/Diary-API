const mongoose = require("mongoose");

const diaryModel = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});
module.exports = mongoose.model("diaries", diaryModel);
