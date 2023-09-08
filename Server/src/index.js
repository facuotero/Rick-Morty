const http = require("http");
const getCharById = require("./controllers/getCharById");

http
  .createServer((request, response) => { //Request es un objeto.
    response.setHeader("Access-Control-Allow-Origin", "*");
    const {url} = request;
    if(url.includes( "/rickandmorty/character")){
      const urlId = url.split("/").at(-1)
      getCharById(response, urlId)
    };
  })
  .listen(3001, "localhost");