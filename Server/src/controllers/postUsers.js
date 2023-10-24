const {User} = require("../DB_connection");

const postUser = async (req,res) => {
const {email,password} = req.body;
if(!email || !password) res.status(400).send("Faltan datos");
try {
    const [user,created] = await User.findOrCreate({
        where:{email},
        defaults:{email,password}
    })
    if(created) res.status(201).json(user)//201 created
    if(!created) res.status(200),json(user)//200 OK

} catch (error) {
    res.status(500).json({error:error.message})
}
}

module.exports = postUser;
