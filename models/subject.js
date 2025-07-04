const mongoose = require("mongoose");

const gradeComponentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
  mandatory: { type: Boolean, default: true },
  condition: {
    minAverage: { type: Number }, // ex: só conta se média >= X
  },
  extra: { type: Boolean, default: false },
});

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  studyPeriodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StudyPeriod",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  gradeComponents: [gradeComponentSchema], // array de componentes da nota
});

module.exports = mongoose.model("Subject", subjectSchema);
