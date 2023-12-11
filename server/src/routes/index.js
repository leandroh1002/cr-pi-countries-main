const router = require ('express').Router();
const getCountry = require("../controllers/getCountry")
const getActivity = require("../controllers/getActivity")
const getCountryById = require("../controllers/getCountryById")
const getCountryByQuery = require("../controllers/getCountryByQuery")
const postActivity = require("../controllers/postActivity")

router.get('/countries/' , getCountry)  // /api/countries
router.get('/countries/search' , getCountryByQuery)  // /api/countries
router.get('/countries/:idPais' , getCountryById)  // /api/countries

router.get('/activities' , getActivity)// /api/activities
router.post('/activities' , postActivity)// /api/activities

module.exports = router;
