import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'


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

  return (
   <div className={styles.container}>
      <div className={styles.divcardsdetail}>
         <div >
            <img className={styles.divheader} src={countries.image} />
         </div>

         <div className={styles.div}>
            <h1 className={styles.divh1}>{countries.name}</h1>
               <div className={styles.divh2}>
               {/* <h2>Status: {countries.status}</h2> //! Va a depender de como traiga axios la Data, hay que hacer console.log
               <h2>Especie: {countries.species}</h2>
               <h2>Genero: {countries.gender}</h2>
               <h2>{countries.origin && countries.origin.name && (<>Origen: {countries.origin.name}</>)}</h2> */}
               </div>
         </div>
      </div>
   </div>
  )
}

export default Detail;