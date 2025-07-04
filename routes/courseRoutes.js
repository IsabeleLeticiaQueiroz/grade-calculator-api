const express = require("express");
const router = express.Router();
const {
  createCourse,
  getCoursesByUser,
} = require("../controllers/courseController");

router.post("/", createCourse);
router.get("/user", getCoursesByUser); // sem :userId

module.exports = router;
