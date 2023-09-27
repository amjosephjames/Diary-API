const express = require("express");
const router = express.Router();
const {
  getDiary,
  updateDiary,
  getOneDiary,
  deleteDiary,
  createDiary,
} = require("../controller/diaryController");

router.route("/:id").post(createDiary);
router.route("/:id").get(getDiary);

router
  .route("/:id/:diary")
  .get(getOneDiary)
  .delete(deleteDiary)
  .patch(updateDiary);

module.exports = router;
