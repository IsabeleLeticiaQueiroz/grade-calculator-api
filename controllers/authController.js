    const User = require("../models/user");
    const jwt = require("jsonwebtoken");
    const bcrypt = require("bcryptjs");
    const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
    };

   exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    
    const user = await User.create({ name, email, password }); // senha pura

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


    exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log("Usuário encontrado:", user); // ← adicione isso    
        if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Senha enviada:", password);
        console.log("Hash salvo:", user.password);
        console.log("Resultado da comparação:", isMatch);
        if (!isMatch) {
        return res.status(400).json({ error: "Invalid email or password" });
        }

        // Envia o token na resposta
        res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };
