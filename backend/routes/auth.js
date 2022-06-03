const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/login", async (req, res, next) => {
  try {
    //take email and password and add a new user
  } catch (err) {
    next(err);
  }
});

// router.post();

module.exports = router;
