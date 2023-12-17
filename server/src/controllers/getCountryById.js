const { Router } = require("express");
const { Country, Activity } = require("../db");
const router = Router();

// Ruta para obtener un país por su ID
const getCountryById = async (req, res) => {
  const { idPais } = req.params;

  try {
    const country = await Country.findOne({
      where: { id: idPais },
      include: Activity,
    });

    if (country) {
      res.json(country);
    } else {
      res.status(404).json({ message: 'País no encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el país.' });
  }
};

module.exports = getCountryById;
