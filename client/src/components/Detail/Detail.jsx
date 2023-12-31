import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from "./Detail.module.css";



function Detail() {
    const [countries, setCountries] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        axios(`http://localhost:3001/api/countries/${id}`).then(({ data }) => {
           if (data.name) {
              setCountries(data);
           } else {
              window.alert('No hay countries con ese ID');
           }
        });
        return setCountries({});
     }, [id]);
console.log(countries)
  return (
   <div className={styles.maincontainer}>
      <div className={styles.divcardsdetail}>
         <div >
            <img className={styles.divheader} src={countries.flags} />
         </div>

         <div className={styles.div}>
            <h1 className={styles.divh1}>{countries.name}</h1>
               <div className={styles.divh2}>
                  <h2>ID: {countries.id}</h2>
                  <h2>Capital: {countries.capital}</h2>
                  <h2>Continente: {countries.continents}</h2>
                  <h2>Sub Region: {countries.subregion}</h2>
                  <h2>Area: {countries.area}</h2>
                  <h2>Poblacion: {countries.poblacion}</h2>
                  
                  <h2>Actividades:</h2>
                  <div className={styles.divActivities}>
                  {countries.Activities ? (
                     countries.Activities.map((activity) => (
                        <details name="info" open><summary>Nombre: {activity.Nombre}</summary>
                        <div className={styles.Actp}>
                           <p>Dificultad: {activity.Dificultad}</p>
                           <p>Duración: {activity.Duracion}</p>
                           <p>Temporada: {activity.Temporada}</p>
                        </div>
                     </details>
                     ))
                  ) : (
                     <p>No hay actividades disponibles.</p>
                  )}
                  </div>
               </div>
         </div>
      </div>
   </div>
  )
}

export default Detail;