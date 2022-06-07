const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { userJwt } = require("../utils/jwt");
const security = require("../middleware/security");
const Sleep = require("../models/sleep");

router.get(
  "/range/:start/:end",
  security.enforceJwt,
  async (req, res, next) => {
    try {
      const { start, end } = req.params;
      const { email } = res.locals.user;
      const records = await Sleep.fetchSleepBetween(email, start, end);
      return res.status(200).json({ records });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/", security.enforceJwt, async (req, res, next) => {
  try {
    const { email } = res.locals.user;
    const records = await Sleep.fetchSleepByEmail(email);
    return res.status(200).json({ records });
  } catch (err) {
    next(err);
  }
});

router.post("/", security.enforceJwt, async (req, res, next) => {
  try {
    const { email } = res.locals.user;
    const recorded_sleep = await Sleep.record(email, req.body);
    return res.status(200).json({ recorded_sleep });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
