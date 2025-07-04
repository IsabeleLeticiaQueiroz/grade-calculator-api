const express = require("express");
const router = express.Router();
const { createStudyPeriod, getStudyPeriods } = require("../controllers/periodController");

router.post("/", createStudyPeriod);
router.get("/", getStudyPeriods);

module.exports = router;
