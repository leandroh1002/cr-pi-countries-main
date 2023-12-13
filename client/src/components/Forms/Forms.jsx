import React, { useState } from 'react';
import styles from './Forms.module.css';
import validate from '../../Functions/Validation';
import axios from 'axios';

function Forms(props) {
  const [userData, setUserData] = useState({
    Nombre: '',
    Dificultad: '',
    Duracion: '',
    Temporada: 'Verano',
    Paises: [],
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate(userData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:3001/api/activities', userData);

        if (response.status === 201) {
          // La actividad se creó con éxito, puedes realizar acciones adicionales si es necesario
          console.log('Actividad creada con éxito');
          // Puedes realizar acciones adicionales aquí, por ejemplo, redirigir a otra página o actualizar la lista de actividades.
        } else {
          console.error('Error al crear la actividad');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    } else {
      console.error('Errores de validación:', validationErrors);
      setErrors(validationErrors);
    }
  };

  const handleChange = (event) => {
    if (event.target.name === 'Paises') {
      // Para el campo de selección múltiple, obtenemos las opciones seleccionadas
      const selectedCountries = Array.from(event.target.selectedOptions, (option) => option.value);

      setUserData({ ...userData, Paises: selectedCountries });
    } else {
      setUserData({ ...userData, [event.target.name]: event.target.value });
    }

    // Limpiar los errores cuando el usuario comienza a escribir nuevamente
    setErrors({ ...errors, [event.target.name]: undefined });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} action="">
        <label htmlFor="Nombre">Nombre: </label>
        <input type="text" name="Nombre" value={userData.Nombre} onChange={handleChange} />
        <p className={styles.error}>{errors.Nombre}</p>
        <br />
        <label htmlFor="Dificultad">Dificultad (1-5): </label>
        <input type="number" name="Dificultad" value={userData.Dificultad} onChange={handleChange} />
        <p className={styles.error}>{errors.Dificultad}</p>
        <br />
        <label htmlFor="Duracion">Duración (horas): </label>
        <input type="number" name="Duracion" value={userData.Duracion} onChange={handleChange} />
        <p className={styles.error}>{errors.Duracion}</p>
        <br />
        <label htmlFor="Temporada">Temporada: </label>
        <select name="Temporada" value={userData.Temporada} onChange={handleChange}>
          <option value="Verano">Verano</option>
          <option value="Otoño">Otoño</option>
          <option value="Invierno">Invierno</option>
          <option value="Primavera">Primavera</option>
        </select>
        <br />
        <label htmlFor="Paises">Países: </label>
        <select
          name="Paises"
          value={userData.Paises}
          onChange={handleChange}
          multiple
        >
          <option value="Argentina">Argentina</option>
          <option value="Brasil">Brasil</option>
          <option value="Chile">Chile</option>
          {/* Agrega más países según sea necesario */}
        </select>
        <p className={styles.error}>{errors.Paises}</p>
        <hr />
        <div>
          <button type="submit">Crear Actividad</button>
        </div>
      </form>
    </div>
  );
}

export default Forms;
