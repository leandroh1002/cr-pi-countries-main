const router = require ('express').Router();
const getCountry = require("../controllers/getCountry")
const getActivity = require("../controllers/getActivity")
const getCountryById = require("../controllers/getCountryById")
const getCountryByQuery = require("../controllers/getCountryByQuery")
const postActivity = require("../controllers/postActivity")

router.get('/countries/' , getCountry)  
router.get('/countries/search' , getCountryByQuery) 
router.get('/countries/:idPais' , getCountryById)  

router.get('/activities' , getActivity)
router.post('/activities' , postActivity)

module.exports = router;
