const { Router } = require("express");
const {Activity} = require("../db");
const router = Router();

const postActivity = async (req, res)=>{ //Aqui estamos generando actividades
    const {Nombre, Dificultad, Duracion,Temporada} = req.body;
    const newActivity = await Activity.create({
        Nombre, Dificultad, Duracion,Temporada
    })
    res.send(newActivity)
}

module.exports = postActivity;