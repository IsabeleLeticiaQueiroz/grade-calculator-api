const express = require("express");
const router = express.Router();
const { createGrade, getGradesBySubject } = require("../controllers/gradeController");

router.post("/", createGrade);                      // POST /api/grades
router.get("/:subjectId", getGradesBySubject);      // GET  /api/grades/:subjectId

module.exports = router;
