const http = require("http");
const data = require("./utils/data");

http
  .createServer((request, response) => { //Request es un objeto.
    response.setHeader("Access-Control-Allow-Origin", "*");
    //const {url}=request

    if (request.url.includes("/rickandmorty/character")) {
      const urlId = request.url.split("/").at(-1);
      const personaje = data.find((character) => character.id === +urlId);//Number(urlId)
      response.writeHead(200,{"Content-Type":"application/json"});
      return response.end(JSON.stringify(personaje));
    }
  })
  .listen(3001, "localhost");
