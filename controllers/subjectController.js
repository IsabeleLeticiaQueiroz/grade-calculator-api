const Subject = require("../models/subject");
const Grade = require("../models/grade");

exports.createSubject = async (req, res) => {
  const { name, studyPeriodId, gradeComponents } = req.body;
  const userId = req.user.id;

  try {
    const subject = await Subject.create({
      name,
      studyPeriodId,
      userId,
      gradeComponents,
    });

    res.status(201).json(subject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.getSubjectsByUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const subjects = await Subject.find({ userId }).populate("studyPeriodId");
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.calculateFinalAverage = async (req, res) => {
  const subjectId = req.params.id;
  const userId = req.user.id;

  try {
    const subject = await Subject.findById(subjectId);
    if (!subject) return res.status(404).json({ error: "Subject not found" });

    const grades = await Grade.find({ subjectId, userId });

    let totalWeightedScore = 0;
    let totalWeight = 0;
    const usedComponents = [];
    const pendingComponents = [];
    const includedExtras = [];

    
    const getGradeForComponent = (componentId) =>
      grades.find((g) => g.componentId.toString() === componentId.toString());

    // 1º passo: processa os obrigatórios
    for (const component of subject.gradeComponents) {
      const gradeEntry = getGradeForComponent(component._id);

      if (gradeEntry && (component.mandatory || !component.extra)) {
        totalWeightedScore += gradeEntry.grade * component.weight;
        totalWeight += component.weight;
        usedComponents.push({
          name: component.name,
          grade: gradeEntry.grade,
          weight: component.weight,
        });
      } else if (component.mandatory) {
        pendingComponents.push(component.name);
      }
    }

    // Calcula média parcial antes dos extras
    const partialAverage = totalWeight ? totalWeightedScore / totalWeight : 0;

    // 2º passo: processa os extras que têm condição
    for (const component of subject.gradeComponents) {
      if (component.extra && !component.mandatory) {
        const gradeEntry = getGradeForComponent(component._id);
        if (!gradeEntry) continue;

        const condition = component.condition || {};
        const minAverage = condition.minAverage ?? 0;

        if (partialAverage >= minAverage) {
          totalWeightedScore += gradeEntry.grade * component.weight;
          totalWeight += component.weight;
          usedComponents.push({
            name: component.name,
            grade: gradeEntry.grade,
            weight: component.weight,
          });
          includedExtras.push(component.name);
        }
      }
    }

    const finalAverage = totalWeight ? (totalWeightedScore / totalWeight) : 0;

    res.json({
      subject: subject.name,
      finalAverage: Number(finalAverage.toFixed(2)),
      includedExtras,
      pendingComponents,
      notesUsed: usedComponents,
      totalWeight,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
