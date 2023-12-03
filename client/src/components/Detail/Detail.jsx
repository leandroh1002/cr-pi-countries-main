import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'


function Detail() {
    const [character, setCharacter] = useState([]);
    const {id} = useParams();

    // useEffect(() => {
    //     axios(`http://localhost:3001/rickandmorty/character/${id}`).then(({ data }) => {
    //        if (data.name) {
    //           setCharacter(data);
    //        } else {
    //           window.alert('No hay personajes con ese ID');
    //        }
    //     });
    //     return setCharacter({});
    //  }, [id]);

  return (
   <div className={styles.container}>
      <div className={styles.divcardsdetail}>
         <div >
            <img className={styles.divheader} src={character.image} />
         </div>

         <div className={styles.div}>
            <h1 className={styles.divh1}>{character.name}</h1>
               <div className={styles.divh2}>
               <h2>Status: {character.status}</h2>
               <h2>Especie: {character.species}</h2>
               <h2>Genero: {character.gender}</h2>
               <h2>{character.origin && character.origin.name && (<>Origen: {character.origin.name}</>)}</h2>
               </div>
         </div>
      </div>
   </div>
  )
}

export default Detail;