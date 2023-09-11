import { useState } from "react";

const SearchBar = ({onSearch, randomize}) => {
   //const {onSearch} = props

   const [id,setId] = useState('');

   const handleChange = (event) =>{
      setId(event.target.value) /*Recibimos un evento, hacemos setId porque estamos modificando el estado ya que hay 
      que ir guardando los id en el estado local.event.target.value. Event es un objeto enorme, target es una
      propiedad de event con un objeto enorme tambien, y value es una propiedad de target que contiene el valor.
      A ese valor que le ponen al input lo guardo en mi estado local id.
      No usamos spread operator porque hay que ir modificandolo, sino se me van guardando los nros en id*/
   }


   return (
      <div>
         <input type='search' onChange={handleChange} value={id}/> {/*Con onChange le decimos que cada vez que ocurra un cambio en el 
         input, ejecute la función handleChange. Con value ={id} le decimos el valor es igual al estado y el estado es 
         igual al valor. Si el estado local es distinto a lo que escribe el usuario, mando lo que tengo guardado en el 
         estado local. Es para que sea LO QUE SE ESCRIBE EN TIEMPO REAL. TIENEN QUE SER EXACTAMENTE IGUALES*/}
         <button onClick={()=>{onSearch(id);setId('')}}>Agregar</button>
          {/*No podemos pasar aca directamente id como argumento porque si lo pasamos directamente se ejecutaria la funcion
          al poner () entonces lo ponemos dentro de una callback. Para que el callback se ejecute unicamente cuando se haga
          click. PASAR ARGUMENTO A UNA FUNCION. Piso el valor del input despues de buscar el personaje para que se limpie*/}
          <button onClick={randomize}>Random</button>
      </div>
   );
}

export default SearchBar