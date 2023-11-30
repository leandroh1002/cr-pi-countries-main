import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Route, Routes} from "react";
import PATHROUTES from "./helpers/PathRoutes.helper.js";
import Forms from "./components/Forms.jsx";
import Cards from "./components/Card.jsx";
import Detail from "./components/Detail";
import './App.css'

function App() {

  return (
    <>
    <Routes>
    <Route path={PATHROUTES.LANDING} element={<Forms login={login} />}/>
        <Route path={PATHROUTES.HOME} element={<Cards characters={characters} onClose={onClose}/>}></Route>
        <Route path={PATHROUTES.DETAIL} element={<Detail />}></Route>
    </Routes>
    </>
  )
}

export default App
