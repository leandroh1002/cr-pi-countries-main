const { Router } = require("express");
const {Activity} = require("../db");
const router = Router();

const postActivity = async (req, res)=>{ //Aqui estamos generando actividades
    const {name, dificult, duration,temp} = req.body;
    const newActivity = await Activity.create({
        name, dificult, duration,temp
    })
    res.send(newActivity)
}

module.exports = postActivity;