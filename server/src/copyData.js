const express = require('express');
const axios = require('axios');
const Country = require('./models/Country');
const Activity = require('./models/Activity');

async function cargarDatosIniciales() {
    try {
      // Verifica si ya existen datos en la base de datos
      const countriesCount = await Country.count();
      const activitiesCount = await Activity.count();
  
      if (countriesCount === 0 && activitiesCount === 0) {
        // Si no hay datos, obtén la información de la API externa
        const apiData = await axios.get('http://localhost:5000/countries');
  
        // Procesa los datos y guárdalos en la base de datos
        for (const countryData of apiData.data) {
          const newCountry = await Country.create({
            id: countryAtribute.cca3,
            name: countryAtribute.name.common,
            image: countryAtribute.flags.png,
            continente: countryAtribute.continents,
            capital: countryAtribute.capital,
            subregion: countryAtribute.subregion,
            area: countryAtribute.area,
            poblacion: countryAtribute.population,
          });
  
          // Si hay actividades asociadas al país, agrégales también
        //   if (countryData.activities && countryData.activities.length > 0) {
        //     for (const activityData of countryData.activities) {
        //       const newActivity = await Activity.create({
        //         name: activityData.name,
        //         // Otros campos según la estructura de tu modelo Activity
        //       });
  
        //       // Asocia la actividad al país
        //       await newActivity.addCountry(newCountry);
        //     }
        //   }
        }
  
        console.log('Datos iniciales cargados en la base de datos.');
      } else {
        console.log('La base de datos ya contiene datos.');
      }
    } catch (error) {
      console.error('Error al cargar datos iniciales:', error);
    }
  }

  module.exports = cargarDatosIniciales();