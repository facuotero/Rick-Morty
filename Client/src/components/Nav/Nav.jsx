import SearchBar from "../SearchBar/SearchBar";
import {NavLink} from 'react-router-dom';

const Nav = ({onSearch,randomize}) => {
// es lo mismo que pasar como parametro props y despues en searchbar hacer props.onSearch;
    return(
        <div>
            <SearchBar onSearch={onSearch} randomize={randomize}/>
            <button>
                <NavLink to='/about'>About</NavLink>
            </button>
            <button>
                <NavLink to='/home'>Home</NavLink>
            </button>
            <button>
                <NavLink to='/favorites'>Favorites</NavLink>
            </button>
            <button>LogOut</button>
        </div>
    )
}

export default Nav;
