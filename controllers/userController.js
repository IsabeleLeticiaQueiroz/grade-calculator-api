const User = require("../models/user");
const bcrypt = require("bcryptjs");


exports.updateUser = async (req, res) => {
  const { id } = req.params;
  let { name, email, password } = req.body;

  try {
    if (password) {
      // Hash da senha nova, se houver
      password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // aqui exclui a senha
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
