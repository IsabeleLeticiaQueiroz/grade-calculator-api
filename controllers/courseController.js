const Course = require("../models/course");

exports.createCourse = async (req, res) => {
  const { name, institution } = req.body;
  const userId = req.user.id;  // vem do middleware de autenticação

  try {
    const course = await Course.create({ name, institution, userId });
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCoursesByUser = async (req, res) => {
  const userId = req.user.id;

  try {
    console.log("🔐 Usuário autenticado:", userId);

    const courses = await Course.find({ userId });

    console.log("📚 Cursos encontrados:", courses);

    res.json(courses);
  } catch (err) {
    console.error("❌ Erro ao buscar cursos:", err.message);
    res.status(500).json({ error: err.message });
  }
};
