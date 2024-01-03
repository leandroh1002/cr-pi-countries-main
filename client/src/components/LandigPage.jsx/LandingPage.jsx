import React from 'react'
import { Link } from "react-router-dom";
import PATHROUTES from "../../helpers/PathRoutes.helper";
import styles from "./LandingPage.module.css";




function LandingPage() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.containerDivisiones}>
          <img className={styles.containerimg} src="../src/assets/main.jpg" alt="" />
        </div>
        <div className={styles.containerDivisiones}>
          <h1>Countries</h1>
          <br />
          <Link to={PATHROUTES.HOME}><button>Ingresar</button></Link>
            <br />
            <h2>Fue desarrollado con las siguientes tecnologias:</h2>
            <div className={styles.containertech}>
              <img src="../src/assets/axios.png" alt="axios" />
              <img src="../src/assets/css-3.png" alt="css" />
              <img src="../src/assets/html-5.png" alt="html" />
              <img src="../src/assets/js.png" alt="js" />
              <img src="../src/assets/react.webp" alt="react" />
              <img src="../src/assets/redux.png" alt="redux" />
              <img src="../src/assets/sequelizze.png" alt="sequelize" />
            </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage