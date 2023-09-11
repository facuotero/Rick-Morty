const axios = require("axios");


const URL = "https://rickandmortyapi.com/api/character/";
const getCharById = (req, res) => {
  const { id } = req.params;
  axios(`${URL}${id}`)
  .then((response)=>{
  const {id,status,name,species,origin,image,gender} = response.data
  name ?
  res.status(200).json({id,status,name,species,origin,image,gender}) 
  : res.status(400).send("Not found")
  })
  .catch((error)=>{
   res.status(500).json({message: error.message})
  })
  ;
};

module.exports = {
  getCharById,
};

// const axios = require("axios");

// const getCharById = (response, id) => {
//   axios(`https://rickandmortyapi.com/api/character/${id}`)
//   .then(
//     (response) => response.data
//   )
//   .then(({name, gender, species, origin, image, status}) =>
//   {const character = {
//     id,
//     name,
//     gender,
//     species,
//     origin: origin.name,
//     image,
//     status
// }});

//   response.writeHead(200, { "Content-Type": "application/json" });
//   return response
//     .end(JSON.stringify(character))

//     .catch((error) => {
//       response.writeHead(500, { "Content-Type": "text/plain" });
//       return response.end(error.message);
//     });
// };
