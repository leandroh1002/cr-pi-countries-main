import { useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PATHROUTES from "./helpers/PathRoutes.helper.js";
import Forms from "./components/Forms/Forms.jsx";
import Card from "./components/Card/Card.jsx";
import Detail from "./components/Detail/Detail.jsx";
import Home from "./components/Home/Home.jsx";
import Nav from "./components/Nav/Nav.jsx";
import LandingPage from './components/LandigPage.jsx/LandingPage.jsx';

import './App.css'

function App() {
  const location = useLocation();
  const [countries, setCountries] = useState([]);

//! hay que ver si al final podemos sacar estas funciones a algun archivo a parte
//?Esta funcion onSearch es para cuando ingresan algo en el campo de busqueda del SearchBar
const onSearch = async (id) => {
   try {
    const url = `http://localhost:3001/api/countries/${id}`; // * esta haciendo una peticion al server local, del archivo index.js en la ruta de server

    const {data} = await axios(url)
    
      if (data.name) {
        setCountries((oldCountry) => [...oldCountry, data]);
      }       
    } catch (error) {
      window.alert('¡No Counry con ese id!');
   }
}
 
//? esta funcion es para el boton de cerrar si no me equivoco
const onClose =(id) =>{
  setCountries(
    countries.filter((char) =>{
      return char.id !== (id)
    })
  )
}

  return (
    <div>
    {location.pathname !== "/" && <Nav onSearch={onSearch} /> }
    <Routes>
        <Route path={PATHROUTES.LANDING} element={<LandingPage/>}></Route>
        <Route path={PATHROUTES.HOME} element={<Home countries={countries} onClose={onClose}/>}></Route>
        <Route path={PATHROUTES.DETAIL} element={<Detail/>}></Route>
    </Routes>
    </div>
  )
}

export default App
