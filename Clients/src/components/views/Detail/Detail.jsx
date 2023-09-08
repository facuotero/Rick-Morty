import axios from 'axios';
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';


const Detail = () => {
    
    const [character,setCharacter] = useState({})
    const {id} = useParams();
   
    useEffect(() => {//busca el personaje de la API cada vez que el componente se monte. Y luego, cada vez que se desmonte
      axios(`http://localhost:3001/rickandmorty/character/${id}`).then(({ data }) => {
      //lo borrará
         if (data.name) {
            setCharacter(data);
         } else {
            window.alert('No hay personajes con ese ID');
         }
      });
      return setCharacter({});
   }, [id])

    return(
        <div>
           <div>
           <h2>{character.name}</h2>
           <img src={character.image} alt={character.name} />
           </div>

           <div>
           <h3>Specie:</h3>
           <p>{character.species}</p>
           </div>

           <div>
           <h3>Gender:</h3>
           <p>{character.gender}</p>
           </div>

           <div>
           <h3>Status:</h3>
           <p>{character.status}</p>
           </div>

           <div>
           <h3>Origin:</h3>
           <p>{character.origin?.name}</p>
           </div>
           
           <div>
           <h3>Location:</h3>
           <p>{character.location?.name}</p>
           </div>

        </div>
    )
}
export default Detail