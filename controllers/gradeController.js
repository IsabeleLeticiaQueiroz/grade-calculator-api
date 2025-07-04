const Grade = require("../models/grade");

exports.createGrade = async (req, res) => {
  const { subjectId, componentId, grade } = req.body;
  const userId = req.user.id;

  try {
    const created = await Grade.create({ subjectId, componentId, grade, userId });
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getGradesBySubject = async (req, res) => {
  const { subjectId } = req.params;
  const userId = req.user.id;

  try {
    const grades = await Grade.find({ subjectId, userId });
    res.json(grades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
