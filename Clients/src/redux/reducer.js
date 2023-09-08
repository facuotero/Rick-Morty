import { ADD_FAV, REMOVE_FAV, FILTER, ORDER } from "./action";

const initialState = {
    myFavorites : [],
    allCharacters : []
};

const rootReducer = (state = initialState, action) => {
    
    switch(action.type){
        case ADD_FAV: 
            return {
                ...state,
                myFavorites: [...state.myFavorites, action.payload],
                allCharacters: [...state.allCharacters, action.payload]
            }
        case REMOVE_FAV:
            return {
                ...state,
                myFavorites: state.myFavorites.filter((fav)=>
                fav.id !== Number(action.payload) //id = number; payload = string => number
                )
            }
        case FILTER:
            if (action.payload === "All Characters"){
                return {
                    ...state,
                    myFavorites: [...state.allCharacters]
                }
            } else {
                return {
                    ...state,
                    myFavorites: state.allCharacters.filter(character => character.gender === action.payload)
                }
            }
 
        case ORDER:
            return {
                ...state,
                myFavorites: action.payload === "A" ? 
                state.allCharacters.sort((a,b)=> a.id - b.id) : 
                state.allCharacters.sort((a,b) => b.id - a.id )
            }
      

        default:
        return {...state}
    }
}

export default rootReducer;
