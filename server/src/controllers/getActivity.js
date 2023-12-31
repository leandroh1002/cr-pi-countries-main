const { Router } = require("express");
const { Activity } = require("../db");
const router = Router();

const getActivity = async (req, res) => {
    try {
        const activities = await Activity.findAll();
        res.status(200).json(activities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Hubo un error al procesar la solicitud" });
    }
};

module.exports = getActivity;
