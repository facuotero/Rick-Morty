import { connect, useDispatch } from "react-redux";
import Card from "../../Card/Card";
import {filterCards, orderCards} from "../../../redux/action"
import { useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
const Favorites = ({myFavorites}) => {

const dispatch = useDispatch();
const [aux,setAux] = useState(false)


const handleOrder = (event) => {
    dispatch(orderCards(event.target.value))
    setAux(!aux)
}
const handleFilter = (event) => {
    dispatch(filterCards(event.target.value))
}


return (
    <div>
    <select onChange={handleOrder}>
        <option value="A">A</option>
        <option value="D">D</option>
    </select>
     <select onChange={handleFilter}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Genderless">Genderless</option>
        <option value="unknown">unknown</option>
     </select>
      {myFavorites.map(personaje=>(
       <Card 
       key={personaje.id}
       id = {personaje.id}
       name={personaje.name}
       status={personaje.status}
       species={personaje.species}
       gender={personaje.gender}
       origin={personaje.origin}
       image={personaje.image}
       />
       ))}
    </div>
)
}

const mapStateToProps = (state) => {
    return{
        myFavorites: state.myFavorites
    }

}

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps,null)(Favorites);