const express = require("express");
const mainRouter = require("./routes/mainRouter");
const morgan = require("morgan")


const server = express();

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server raised in port: ${PORT}`)
})

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
     'Access-Control-Allow-Headers',
     'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header(
     'Access-Control-Allow-Methods',
     'GET, POST, OPTIONS, PUT, DELETE'
  );
  next();
});

server.use(express.json());

server.use(morgan("dev"));

server.use("/rickandmorty", mainRouter); //todo lo que pase por rickandmorty va a ser enviado al main router/
//agregamos el prefijo rickandmorty en todas las rutas.





// const http = require("http");
// const getCharById = require("./controllers/getCharById");

// http
//   .createServer((request, response) => { //Request es un objeto.
//     response.setHeader("Access-Control-Allow-Origin", "*");
//     const {url} = request;
//     if(url.includes( "/rickandmorty/character")){
//       const urlId = url.split("/").at(-1)
//       getCharById(response, urlId)
//     };
//   })
//   .listen(3001, "localhost");