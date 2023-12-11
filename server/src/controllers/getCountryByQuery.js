const { Router } = require("express");
const { Op } = require("sequelize");
const {Country} = require("../db")
const router = Router();

//? Esta ruta es para el componente SearchBar
const getCountryByQuery =  async (req, res) => { //! Consultar sobre como debe quedar la ruta
  const { name } = req.query;
  console.log('Valor de name:', name);
  try {
    const countries = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`, // Búsqueda insensible a mayúsculas y minúsculas
        },
      },
    });
    if (countries.length > 0) {
      res.json(countries);
    } else {
      res.status(404).json({ message: 'No se encontraron países con ese nombre.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al buscar países por nombre.' });
  }
};

module.exports = getCountryByQuery;