const { Router } = require("express");
const countryRoute = require("../controllers/Country")
const activityRoute = require("../controllers/Activity")

const router = Router();

//Cuando quede modularizado deberia verse como el del index.js de rickandmorty

router.use('/countries' , countryRoute)  // /api/countries
router.use('/activity' , activityRoute)// /api/activity

module.exports = router;
