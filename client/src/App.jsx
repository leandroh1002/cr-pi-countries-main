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



  const onSearch = async (id) => {
    try {
     const url = `http://localhost:3001/rickandmorty/character/${id}`;
 
     const {data} = await axios(url)
     
       if (data.name) {
          setCharacters((oldChars) => [...oldChars, data]);
       }       
     } catch (error) {
       window.alert('¡No hay personajes con este ID!');
    }
 }

  return (
    <div>
    {location.pathname !== "/" && <Nav onSearch={onSearch} /> }
    <Routes>
        <Route path={PATHROUTES.LANDING} element={<LandingPage/>}></Route>
        <Route path={PATHROUTES.HOME} element={<Home/>}></Route>
        <Route path={PATHROUTES.DETAIL} element={<Detail/>}></Route>
    </Routes>
    </div>
  )
}

export default App
