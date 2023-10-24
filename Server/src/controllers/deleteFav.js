const { Favorite } = require("../DB_connection");

const deleteFav = async (req, res) => {
  const { id } = req.params;
  try {
    const userToDelete = await Favorite.findByPk(id);
    userToDelete
      ? await userToDelete.destroy()
      : res.status(400).send("No existen usuarios con ese ID");
    const allFavs = Favorite.findAll();
    res.status(200).json(allFavs)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteFav;
