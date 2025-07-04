const express = require("express");
const router = express.Router();
const {
  createSubject,
  getSubjectsByUser,
  calculateFinalAverage
} = require("../controllers/subjectController");

router.get("/:id/calculate", calculateFinalAverage); // nova rota
router.post("/", createSubject);      // POST /api/subjects
router.get("/", getSubjectsByUser);   // GET /api/subjects

module.exports = router;
