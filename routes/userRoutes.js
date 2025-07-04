const express = require("express");
const router = express.Router();
const { getUsers, updateUser } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");


router.get("/", protect, getUsers);     // rota protegida
router.put("/:id", protect, updateUser); // rota protegida

module.exports = router;
