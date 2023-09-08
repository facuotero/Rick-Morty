import {useState} from 'react';
import style from "./form.module.css"

const Form = ({login}) => {

    const [userData,setUserData] = useState({
        email:'',
        password:''
    })
    const inputHandler = (event) => {
    setUserData({
        ...userData,
        [event.target.name]:event.target.value 
    })
    setErrors(validate({
        ...userData,
        [event.target.name]:event.target.value
    }))}

    const disableHandler = () => {
    let disabled;
    for(let error in errors){
        if(errors[error] === ''){
            disabled = false;
        }else{
            disabled = true
            break;
        }
    }
    return disabled
    }


   const submitHandler = (event) => {
    event.preventDefault();
    alert('Welcome')
    login(userData)
    
   }

    const [errors,setErrors] = useState({
        email:'Email required',      //errores al principio
        password:'Password required'
    });    
      

    const validate = (input) => {
            let errors = {}; //objeto para luego asignarle los errores a mi estado. El cual va a ser un objeto.
            if(input.password.length < 7 || input.password.length > 10) {
                errors.password = 'Password debe tener entre 6 y 10 caracteres'
            }
            if(!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.email)){
                errors.email = 'Debe ser un email valido'
            }
  
            if(input.email.length > 35){
                errors.email = 'Mail muy largo'
            }
            if(!/\d/.test(input.password)){
                errors.password = 'Password debe contener al menos un numero'
            }
            
            return errors
    }

    const handleSubmit = (event,{login}) => {
     event.preventDefault();
     login(userData)
    }

    return (
        <div className={style.body}>

            <img className={style.imgLogin} src="./src/assets/images/pngegg.png"/>
        
        <form onSubmit={submitHandler} className={style.login}>
            <div>
            <br />
            <label className={style.inputText}>Email: </label>
            <input type="text" name='email' value={userData.email} onChange={inputHandler} placeholder='email'></input>
            <span>{errors.email}</span>
            </div>
            <br />
            <div>
            <label className={style.inputText}>Password: </label>
            <input type="password" name='password' value={userData.password} onChange={inputHandler} placeholder='password'></input>
            <span>{errors.password}</span>
            </div>
            <br/>
            <div>
            <button type='submit' className={style.button} disabled={disableHandler()} onSubmit={handleSubmit}>Submit</button>
            </div>

        </form>
            </div>
    )
}

export default Form;