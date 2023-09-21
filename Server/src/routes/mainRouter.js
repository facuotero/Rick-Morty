const mainRouter = require("express").Router();
const login = require("../controllers/login");
const getCharById = require("../controllers/getCharById");
const {postFav,deleteFav} = require("../controllers/handleFavorites");

mainRouter.get("/character/:id", getCharById);
mainRouter.get("/login", login);

mainRouter.post("/fav", (req,res) => {
    postFav(req,res);
});
mainRouter.delete("/fav/:id",deleteFav)

module.exports = mainRouter;