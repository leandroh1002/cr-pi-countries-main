const { Router } = require("express");
const { Activity } = require("../db");
const router = Router();

const postActivity = async (req, res) => {
  const { Nombre, Dificultad, Duracion, Temporada, Paises } = req.body;
  const [newActivity, created] = await Activity.findOrCreate({
    where: {
      Nombre, Dificultad, Duracion, Temporada
    }
  });

  if (created) {
    await Promise.all(Paises.map(async country => await newActivity.addCountry(country)));
  }

  res.send(newActivity);
};

module.exports = postActivity;
