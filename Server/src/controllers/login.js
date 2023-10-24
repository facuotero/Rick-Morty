const { User } = require("../DB_connection");

const login = async (req, res) => {
  const { email, password } = req.query;
  if (!email || !password) res.status(404).send("Faltan datos");

  try {
    const userFound = await User.findOne({
      where: {email},
    });
    if (!userFound) res.status(404).send("Usuario no encontrado");
    if (userFound.password !== password) res.status(403).send("Contraseña incorrecta");
    return res.status(200).json({ access: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = login;
