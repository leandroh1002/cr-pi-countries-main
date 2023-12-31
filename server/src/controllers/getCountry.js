const { Router } = require("express");
const { Country, Activity } = require("../db");
const router = Router();

const getCountry = async (req, res) => {
    try {
        const countries = await Country.findAll({
            include: Activity
        });

        res.status(200).json(countries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Hubo un error al procesar la solicitud" });
    }
};

module.exports = getCountry;
