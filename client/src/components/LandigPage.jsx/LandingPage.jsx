import React from 'react'
import { Link } from "react-router-dom";
import PATHROUTES from "../../helpers/PathRoutes.helper";



function LandingPage() {
  return (
    <div>
    <div>
        <img/>
    </div>

    <div>
        <h1>Countries</h1>
        <p>Bienvenidos al proyecto individual del Bootcamp Henry, aqui aplicammos todo el conocimiento adquirido a lo largo de estos meses...</p>
        <br />
        <Link to={PATHROUTES.HOME}><button>Ingresar</button></Link>
    </div>
</div>
  )
}

export default LandingPage