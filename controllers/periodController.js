const StudyPeriod = require("../models/period");

exports.createStudyPeriod = async (req, res) => {
  const { courseId, periodNumber, durationMonths } = req.body;
  const userId = req.user.id;

  try {
    const studyPeriod = await StudyPeriod.create({
      courseId,
      periodNumber,
      durationMonths,
      userId, // ← vincula ao usuário autenticado
    });

    res.status(201).json(studyPeriod);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getStudyPeriods = async (req, res) => {
  const userId = req.user.id;

  try {
    const studyPeriods = await StudyPeriod.find({ userId }).populate("courseId");
    res.json(studyPeriods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
