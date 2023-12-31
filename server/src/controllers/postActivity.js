const { Router } = require("express");
const { Activity } = require("../db");
const router = Router();

const postActivity = async (req, res) => {
  try {
    const { Nombre, Dificultad, Duracion, Temporada, Paises } = req.body;
    const [newActivity, created] = await Activity.findOrCreate({
      where: {
        Nombre, Dificultad, Duracion, Temporada
      }
    });

    if (created) {
      await Promise.all(Paises.map(async country => await newActivity.addCountry(country)));
    }

    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = postActivity;
