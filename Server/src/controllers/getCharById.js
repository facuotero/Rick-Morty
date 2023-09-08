const axios = require("axios");

const getCharById = (response, id) => {
  axios(`https://rickandmortyapi.com/api/character/${id}`)
  .then(
    (response) => response.data
  )
  .then(({name, gender, species, origin, image, status}) =>
  {const character = {
    id,
    name, 
    gender, 
    species, 
    origin: origin.name,
    image,
    status
}});

  response.writeHead(200, { "Content-Type": "application/json" });
  return response
    .end(JSON.stringify(character))

    .catch((error) => {
      response.writeHead(500, { "Content-Type": "text/plain" });
      return response.end(error.message);
    });
};

module.exports = {
  getCharById,
};
