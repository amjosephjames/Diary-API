const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,

      unique: true,
    },
    password: {
      type: String,
    },
    diary: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "diaries",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userModel);
