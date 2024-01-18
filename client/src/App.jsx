import { useState } from 'react'
import { Route, Routes, useLocation } from "react-router-dom";
import axios from "axios";
import PATHROUTES from "./helpers/PathRoutes.helper.js";
import Forms from "./components/Forms/Forms.jsx";
import Detail from "./components/Detail/Detail.jsx";
import Nav from "./components/Nav/Nav.jsx";
import LandingPage from './components/LandigPage.jsx/LandingPage.jsx';
import Home from './components/AllCountries/Home.jsx';
import './App.css'

function App() {
  const location = useLocation();
  const [country, setCountry] = useState([]);

const onSearch = async (name) => {
  try {
    const url = `https://countriesback-l6bu.onrender.com/api/countries/`;

    const { data } = await axios.get(url + `search?name=${name}`);
    if (data.length > 0) {
      
      setCountry(data);
    } else {
      new error;
    }
  } catch (error) {
    window.alert('No se encontraron países con ese fragmento de nombre.');
  }
};

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
