const mongoose = require("mongoose");

const studyPeriodSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  periodNumber: { type: Number, required: true },
  durationMonths: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ADICIONADO
});

module.exports = mongoose.model("StudyPeriod", studyPeriodSchema);
