const express = require('express');
const axios = require('axios');
const { Country } = require("./db");

const cargarDatosIniciales = async () => {
  try {
    const existingCountries = await Country.findAll({ attributes: ['id'] });
    const existingCountryIds = existingCountries.map(country => country.id);
    const apiData = await axios.get('http://localhost:5000/countries');

    for (const countryAtribute of apiData.data) {
      if (!existingCountryIds.includes(countryAtribute.cca3)) {
        const newCountry = await Country.create({
          id: countryAtribute.cca3,
          name: countryAtribute.name.common,
          flags: countryAtribute.flags.png,
          continents: countryAtribute.continents[0] || "",
          capital: countryAtribute.capital ? countryAtribute.capital[0] : "",
          subregion: countryAtribute.subregion,
          area: countryAtribute.area,
          poblacion: countryAtribute.population,
        });
      }
    }

    console.log('Datos iniciales cargados en la base de datos.');
  } catch (error) {
    console.error('Error al cargar datos iniciales:', error);
  }
}

module.exports = cargarDatosIniciales;
