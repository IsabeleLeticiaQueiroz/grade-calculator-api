const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  componentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, // não precisa de ref, vem de dentro de subject.gradeComponents
  },
  grade: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Grade", gradeSchema);
