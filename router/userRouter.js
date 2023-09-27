const express = require("express");
const router = express.Router();
const {
  getAllUser,
  getOneUser,
  updateUser,
  deleteUser,
  createUser,
  signinUser,
} = require("../controller/userController");

router.route("/signin").post(signinUser);
router.route("/register").post(createUser);
router.route("/").get(getAllUser);
router.route("/:id").get(getOneUser);
router.route("/:id/update").patch(updateUser);
router.route("/:id/delete").delete(deleteUser);

module.exports = router;
