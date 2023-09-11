import Cards from './components/Cards/Cards.jsx';
import Nav from './components/Nav/Nav.jsx'
import './App.css';
import {useState} from 'react'
import axios from 'axios'
import {Routes, Route} from 'react-router-dom';
import About from './components/views/About/About.jsx';
import Detail from './components/views/Detail/Detail.jsx';
import ErrorPage from './components/views/ErrorPage/ErrorPage.jsx';
import { useLocation } from 'react-router-dom';
import Form from './components/views/Login/Form.jsx';
import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import Favorites from './components/views/Favorites/Favorites.jsx';

function App() {
   //!ACOMODAR HOOKS
   //!ACOMODAR EVENT HANDLERS
   //!MODULARIZAR
   //!ARCHIVO QUE IMPORTA Y EXPORTA LOS COMPONENTES PARA LUEGO IMPORTAR TODO DEL MISMO LUGAR. INDEX.JS EN CARPETA COMPONENTS SOLO
   const location = useLocation();
   const [access,setAccess] = useState(false);
   const navigate = useNavigate()
   
   
      function loginHandler(userData) {
         const { email, password } = userData;
         const URL = 'http://localhost:3001/rickandmorty/login/';
         axios(URL + `?email=${email}&password=${password}`).then(({ data }) => {
            const { access } = data;
            setAccess(data);
            access && navigate('/home');
         });
      }

   // const EMAIL = 'facurimini@gmail.com';
   // const PASSWORD = 'talleres1';

   // const login = (userData) =>{ /*Si el mail y contraseña son correctos, me ingresa a la página mediante navigate. Llamo a la funcion y le paso el lugar
   // a donde quiero que me direccione. */
   // if(userData.email === EMAIL && userData.password === PASSWORD){
   // setAccess(true);
   // navigate('/home'); 
   // }
   // }


   useEffect(() => {
      !access && navigate('/');
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [access]);

   const [characters,setCharacters] = useState([]) //para modificar el estado usamos setCharacters.
  
   const onSearch = (id) => { //Es lo que escribe el usuario. id viene de searchBar y es el event.target.value
      /*setCharacters([...characters,example]) Haceme una copia, y le concatenamos el objeto con el personaje [COPIA,CONCATENACION]
      Si yo vengo y le digo acá que el estado es algo, estoy pisando todo lo que tenia
      anteriormente ese estado, por lo que con el spread operator hacemos la copia para que no se pierda la informacion que
      tenia anteriormente*/

      //AXIOS: LIBRERIA PARA HACER PETICIONES A APIS. Hacer referencia a AJAX
      axios(`http://localhost:3001/rickandmorty/character/${id}`)//le pasamos la url. {id} es para que haga la peticion de lo que pone el usuario
      .then(({ data }) => {/*Se hace destructuring de data porque axios me da un objeto gigante y en su propiedad data esta la
       respuesta de la api. then()metodo que hace que reciba la respuesta*/
         if (data.name) { //si hay un data.name
            setCharacters((oldChars) => [...oldChars, data]);//esta callback recibe toda la informacion que tenia mi estado
            //hacemos una copia de todo lo que tenia y le agrego lo nuevo
         } else {//si no hay un nombre con esa data
            window.alert('¡No hay personajes con este ID!');
         }
      })
   }
   const onClose = (id) =>{
   const charactersFiltered = characters.filter(character =>
   character.id !== Number(id))//Number porque me llega como string
   console.log(charactersFiltered)
   setCharacters(charactersFiltered)
   }
   
   const randomHandler = () => {
      let randomId = (Math.random() * 5).toFixed();

      randomId = parseInt(randomId);
      if(!characters.includes(randomId)){
         onSearch(randomId)
      } else {
         alert('ese personaje ya fue agregado')
         return;
      }
   }


   return (
      <div className='App'>

         {location.pathname !== '/'  ? <Nav onSearch={onSearch} randomize={randomHandler}/>: null} {/*Si no estoy ubicado en el inicio, renderiza la barra
         de navegacion 
         {location.pathname !== '/' && <Nav onSearch={onSearch}/>}
         */}
         <Routes>

         <Route path='/home' element={<Cards characters={characters} onClose={onClose}/>}/>
         <Route path='/about' element={<About/>}/>
         <Route path='/detail/:id' element={<Detail/>}/> {/*Ruta Dinamica*/}
         <Route path='*' element={<ErrorPage/>}/>
         <Route path='/' element={<Form login= {loginHandler}/>}/>
         <Route path='/favorites' element={<Favorites/>}/>

         </Routes>
      </div>
   ); 
}

export default App;
