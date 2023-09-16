import style from "./card.module.css"
import {Link, useNavigate} from 'react-router-dom';
import { addFav, removeFav } from '../../redux/action';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
function Card({id,name,status,species,gender,origin,image,onClose,addFav,removeFav,myFavorites}) {
  //const {name,status,species,gender,origin,image,OnClose} = props;
const navigate = useNavigate();

const [isFav,setIsFav] = useState(false);

const handleFavorite = () => {
   if(isFav){
   setIsFav(false)
   removeFav(id)
   } else {
   setIsFav(true)
   addFav({id,name,status,species,gender,origin,image,onClose,
      addFav,removeFav,myFavorites})
   }
}

useEffect(() => {
   myFavorites.forEach((fav) => {
      if (fav.id === id) {
         setIsFav(true);
      }
   });
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [myFavorites]);

   return (
      <div className={style.card}>
         {isFav ? (<button onClick={handleFavorite}>❤️</button>) :
         (<button onClick={handleFavorite}>🤍</button>)}
   
         <button onClick={() => onClose(id)}>X</button>
         <Link to={`/detail/${id}`}> {/*se puede hacer con el use navigate. invocand a navigate con lo que está en to, y un
         onClick donde queremos que suceda */}
         <h2>{name}</h2>
         </Link>
         <h2>{status}</h2>
         <h2>{species}</h2>
         <h2>{gender}</h2>
         <h2>{origin}</h2>
         <img src={image} alt={name} onClick={() => navigate(`/detail/${id}`)}/>
      </div>
   );
}

const mapStateToProps = (state) => {
   return{
      myFavorites: state.myFavorites
  }
}

const mapDispatchToProps = (dispatch) => {
   return {
      addFav: (favorite) => dispatch(addFav(favorite)),
      removeFav: (id) => dispatch(removeFav(id))
   }
}

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps,mapDispatchToProps)(Card)

