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

    return country ? res.status(200).json(country) : res.status(404).json({ message: 'País no encontrado.' });
    
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getCountryById;
