const { Router } = require("express");
const { Op } = require("sequelize");
const {Country} = require("../db")
const router = Router();

const getCountryByQuery =  async (req, res) => { 
  const { name } = req.query;
  console.log('Valor de name:', name);
  try {
    const countries = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    return countries ? 
      res.status(200).json(countries) : res.status(404).json({ message: 'No se encontraron países con ese nombre.' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getCountryByQuery;