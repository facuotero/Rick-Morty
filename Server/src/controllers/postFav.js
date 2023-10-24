const {Favorite} = require("../DB_connection");

const postFav = async (req,res) => {
const {name,origin,status,image,species,gender} = req.body;
if(!name || !origin || !status || !image || !species || !gender){
    res.status(401).send("Faltan datos");  
}
try {
    
    const [user,created] = await Favorite.findOrCreate({
        where:{name},
        defaults: {
            name,origin,status,image,species,gender
        }
    })
    const allFavs = await Favorite.findAll();
    res.status(200).json(allFavs);

} catch (error) {
    res.status(500).json({error:error.message});
}

};

module.exports = postFav;