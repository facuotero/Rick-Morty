import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import Nav from "./components/Nav/Nav.jsx";
import Cards from "./components/Cards/Cards.jsx";
import About from "./components/views/About/About.jsx";
import Detail from "./components/views/Detail/Detail.jsx";
import ErrorPage from "./components/views/ErrorPage/ErrorPage.jsx";
import Form from "./components/views/Login/Form.jsx";
import Favorites from "./components/views/Favorites/Favorites.jsx";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]);
  const [access, setAccess] = useState(false);

  const URL = "http://localhost:3001/rickandmorty/login/";
  const loginHandler = async (userData) => {
    try {
      const { email, password } = userData;
      const { data } = await axios(URL + `?email=${email}&password=${password}`);
      const { access } = data;

      setAccess(access);
      access && navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    !access && navigate("/");
    // eslint-disable-next-line
  }, [access]);

  //Es lo que escribe el usuario. id viene de searchBar y es el event.target.value
  /*setCharacters([...characters,example]) Haceme una copia, y le concatenamos el objeto con el personaje [COPIA,CONCATENACION]
      Si yo vengo y le digo acá que el estado es algo, estoy pisando todo lo que tenia
      anteriormente ese estado, por lo que con el spread operator hacemos la copia para que no se pierda la informacion que
      tenia anteriormente
    AXIOS: LIBRERIA PARA HACER PETICIONES A APIS. Hacer referencia a AJAX
    le pasamos la url. {id} es para que haga la peticion de lo que pone el usuario
    Se hace destructuring de data porque axios me da un objeto gigante y en su propiedad data esta la
       respuesta de la api. then()metodo que hace que reciba la respuesta
       setCharacters:esta callback recibe toda la informacion que tenia mi estado hacemos una copia de todo lo que tenia y le agrego lo nuevo*/
  const onSearch = async (id) => {
    try {
      const { data } = await axios(
        `http://localhost:3001/rickandmorty/character/${id}`
      );

      if (data.name) {
        setCharacters((oldChars) => [...oldChars, data]);
      }
    } catch (error) {
      alert("¡No hay personajes con este ID!");
    }
  };

  const onClose = (id) => {
    let charactersFiltered = characters.filter(
      (character) => character.id !== id
    );
    setCharacters(charactersFiltered);
  };

  const randomHandler = () => {
    let memoria = [];
    let randomId = (Math.random() * 826).toFixed();
    randomId = Number(randomId);

    if (!memoria.includes(randomId)) {
      memoria.push(randomId);
      onSearch(randomId);
    } else {
      alert("Ese personaje ya fue agregado");
      return;
    }
  };

  return (
    <div className="App">
      {location.pathname !== "/" ? (
        <Nav onSearch={onSearch} randomize={randomHandler} />
      ) : null}
      <Routes>
        <Route path="/" element={<Form login={loginHandler} />} />
        <Route
          path="/home"
          element={<Cards characters={characters} onClose={onClose} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/detail/:id" element={<Detail />} /> {/*Ruta Dinamica*/}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
