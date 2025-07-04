const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Importing routes
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const studyPeriodRoutes = require("./routes/periodRoutes");
const authRoutes = require("./routes/authRoutes");
const { protect } = require("./middleware/authMiddleware");
const subjectRoutes = require("./routes/subjectRoutes");
const gradeRoutes = require("./routes/gradeRoutes");

app.use("/api/grades", protect, gradeRoutes);
app.use("/api/subjects", protect, subjectRoutes); 
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", protect, courseRoutes);
app.use("/api/studyperiods", protect, studyPeriodRoutes);


//mongodb connection
const PORT = process.env.PORT || 5000; // 5000 é fallback local

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB conectado");
    app.listen(PORT, () =>
      console.log(`🚀 Servidor rodando na porta ${PORT}`)
    );
  })
  .catch((err) => console.error("❌ Erro ao conectar:", err));
