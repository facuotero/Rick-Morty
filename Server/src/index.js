const express = require("express");
const server = express();
const mainRouter = require("./routes/mainRouter");
const morgan = require("morgan");
const PORT = 3001;
const { conn } = require("./DB_connection");

server.use(express.json());
server.use(morgan("dev"));

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/rickandmorty", mainRouter); //todo lo que pase por rickandmorty va a ser enviado al main router/
//agregamos el prefijo rickandmorty en todas las rutas.

conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server raised in port: ${PORT}`);
  });
});
