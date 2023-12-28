import { useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import PATHROUTES from "./helpers/PathRoutes.helper.js";
import Forms from "./components/Forms/Forms.jsx";
import Card from "./components/Card/Card.jsx";
import Detail from "./components/Detail/Detail.jsx";
import Nav from "./components/Nav/Nav.jsx";
import LandingPage from './components/LandigPage.jsx/LandingPage.jsx';
import Home from './components/AllCountries/Home.jsx';
import './App.css'

function App() {
  const location = useLocation();
  const [country, setCountry] = useState([]);

//! hay que ver si al final podemos sacar estas funciones a algun archivo a parte
//?Esta funcion onSearch es para cuando ingresan algo en el campo de busqueda del SearchBar
const onSearch = async (name) => {
  try {
    const url = `http://localhost:3001/api/countries/`;

    const { data } = await axios.get(url + `search?name=${name}`);
    if (data.length > 0) {
      
      setCountry(data);
      console.log(data)
    } else {
      new error;
    }
  } catch (error) {
    window.alert('No se encontraron países con ese fragmento de nombre.');
  }
};

//? esta funcion es para el boton de cerrar si no me equivoco
const onClose =(id) =>{
  setCountry(
    characters.filter((char) =>{
      return char.id !== (id)
    })
  )
}

  return (
    <div>
    {location.pathname !== "/" && <Nav onSearch={onSearch} /> }
    <Routes>
        <Route path={PATHROUTES.LANDING} element={<LandingPage/>}></Route>
        <Route path={PATHROUTES.HOME} element={<Home country={country} onClose={onClose}/>}></Route>
        <Route path={PATHROUTES.DETAIL} element={<Detail/>}></Route>
        <Route path={PATHROUTES.FORM} element={<Forms/>}></Route>
    </Routes>
    </div>
  )
}

export default App
