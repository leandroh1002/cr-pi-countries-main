import { useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import PATHROUTES from "./helpers/PathRoutes.helper.js";
import Forms from "./components/Forms/Forms.jsx";
import Card from "./components/Card/Card.jsx";
import Detail from "./components/Detail/Detail.jsx";
import Home from "./components/Home/Home.jsx";
import Nav from "./components/Nav/Nav.jsx";
import LandingPage from './components/LandigPage/LandingPage.jsx';
import AllCountries from './components/AllCountries/AllCountries.jsx';
import './App.css'

function App() {
  const location = useLocation();
  const [countries, setCountries] = useState([]);

//! hay que ver si al final podemos sacar estas funciones a algun archivo a parte
//?Esta funcion onSearch es para cuando ingresan algo en el campo de busqueda del SearchBar
const onSearch = async (name) => {
  try {
    const url = `http://localhost:3001/api/countries/`;

    const { data } = await axios.get(url + `?name=${name}`);
    if (data.length > 0) {
      
      setCountries(data);
      console.log(data)
    } else {
      window.alert('No se encontraron países con ese fragmento de nombre.');
    }
  } catch (error) {
    window.alert('Error al buscar país.');
  }
};


  return (
    <div>
    {location.pathname !== "/" && <Nav onSearch={onSearch} /> }
    <Routes>
    {/* <Route path={PATHROUTES.HOME} element={<Home countries={countries} />}> </Route> */}

        <Route path={PATHROUTES.LANDING} element={<LandingPage/>}></Route>
        <Route path={PATHROUTES.HOME} element={<AllCountries />}></Route>
        <Route path={PATHROUTES.DETAIL} element={<Detail/>}></Route>
        <Route path={PATHROUTES.FORM} element={<Forms/>}></Route>
    </Routes>
    </div>
  )
}

export default App
