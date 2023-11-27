const { Router } = require("express");
const countryRoute = require("../controllers/Country")
const activityRoute = require("../controllers/Activity")

const router = Router();

//Cuando quede modularizado deberia verse como el del index.js de rickandmorty

router.use('/country' , countryRoute)  // /api/country
router.use('/activity' , activityRoute)// /api/activity

module.exports = router;
