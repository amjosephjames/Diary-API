const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./utils/db");
const user = require("./router/userRouter");
const diary = require("./router/diaryRouter");
db;

// const port = 3001;
const PORT = process.env.PORT || 2004;
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
app.use("/api/user", user);
app.use("/api/diary", diary);
app.get("/", (req, res) => {
  return res.status(200).json({ message: "welcome to my diary api" });
});
app.listen(PORT, () => {
  console.log(`server is now listening on port ${PORT}`);
});
