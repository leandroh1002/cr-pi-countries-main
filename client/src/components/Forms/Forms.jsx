import React, { useState, useEffect } from 'react';
import styles from './Forms.module.css';
import validate from '../../Functions/Validation';
import axios from 'axios';

function Forms() {
  const [userData, setUserData] = useState({
    Nombre: '',
    Dificultad: '',
    Duracion: '',
    Temporada: 'Verano',
    Paises: [],
  });
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);


  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('/countries');
        setCountries(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de países:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate(userData);
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('/activities', userData);
  
        if (response.status === 201) {
          window.alert('Actividad creada con éxito');
        } else {
          window.alert('Error al crear la actividad');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        window.alert('Error en la solicitud');
      }
    } else {
      setErrors(validationErrors);
      window.alert('Errores de validación. Por favor, revise los campos.');
    }
  };
  
  

  const handleChange = (event) => {
    if (event.target.name === 'Paises') {
      const selectedCountries = Array.from(event.target.selectedOptions, (option) => option.value);
      setUserData({ ...userData, Paises: selectedCountries });
    } else {
      setUserData({ ...userData, [event.target.name]: event.target.value });
    }

    setErrors({ ...errors, [event.target.name]: undefined });
  };


  return (
    <div className={styles.maincontainer}>
      <br />
    <div className={styles.container}>
      <form className={styles.containerForm} onSubmit={handleSubmit} action="">

        <div className={styles.etiquetas}>
          <div className={styles.campos}>
            <label htmlFor="Nombre">Nombre de la Actividad</label>
            <p className={styles.error}>{errors.Nombre}</p>
          </div>
          <>
            <input type="text" name="Nombre" value={userData.Nombre} onChange={handleChange} />
          </>
        </div>

        <div className={styles.etiquetas}>
          <div className={styles.campos}>
            <label htmlFor="Dificultad">Dificultad (1-5): </label>
            <p className={styles.error}>{errors.Dificultad}</p>
          </div>
          <>
            <input type="number" name="Dificultad" value={userData.Dificultad} onChange={handleChange} />
          </>
        </div>

        <div className={styles.etiquetas}>
          <div className={styles.campos}>
            <label htmlFor="Duracion">Duración (horas): </label>
            <p className={styles.error}>{errors.Duracion}</p>
          </div>
          <>
            <input type="number" name="Duracion" value={userData.Duracion} onChange={handleChange} />
          </>
        </div>

        <div className={styles.camposDeTemporadas}>
        <label htmlFor="Temporada">Temporada: </label>
        <br />
        <select name="Temporada" value={userData.Temporada} onChange={handleChange}>
          <option value="Verano">Verano</option>
          <option value="Otoño">Otoño</option>
          <option value="Invierno">Invierno</option>
          <option value="Primavera">Primavera</option>
        </select></div>

        <div className={styles.etiquetas}>
          <div className={styles.campos}>
            <label htmlFor="Paises">Países: </label>
            <p className={styles.error}>{errors.Paises}</p>
          </div>
          <>
            <select
              name="Paises"
              value={userData.Paises}
              onChange={handleChange}
              multiple
            >
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
            </select>
          </>
        </div>

        <div>
          <button type="submit">Crear Actividad</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Forms;
