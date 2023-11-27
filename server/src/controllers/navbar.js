const { Router } = require("express");
const {Country, Activity} = require("../db")
const {Op} = require('sequelize')
const axios = require('axios')
const router = Router();

router.get('/', async(req, res)=>{ 

    let name = req.query.name
    let countryPromiseApi //respuesta de la api
    let countryPromiseDb // respuesta de la base de datos
    if(name){
        countryPromiseApi = axios.get('http://localhost:5000/countries/?name=' +name)
        countryPromiseDb = Country.findAll({
            include: Activity,
            where:{
                name: {[Op.iLike]: "%"+name+"%"}
            },
                order:[['name', 'ASC']],
        })
    }else{}
        countryPromiseApi = axios.get('http://localhost:5000/countries/')
        countryPromiseDb = Country.findAll({
        include: Activity
    })
    Promise.all([
        countryPromiseApi, countryPromiseDb
    ])
    .then((respuesta) =>{
        const [countryApi, countryDb] = respuesta
        let filteredCountryApi = countryApi.data.map((countryAtribute)=>{
            return{ //traer solo los datos que necesito para mostrar en el front
                id: countryAtribute.fifa,
                name: countryAtribute.name.common,
            }
        })
        //ordenar para poner de menor a mayor
        let allCountry = [...filteredCountryApi, ...countryDb]
        res.send(allCountry)
    })
}) 
// router.get('/', async(req, res)=>{ //buscando a todos los agregados de la base de datos y probar los enlaces de las tablas de relacion
//     const country = await Country.findAll({
//         include: Activity
//     })
//     res.send(country)
// }) 

router.get('/:idPais', (req, res)=>{
    res.send('soy get /country')
}) 
router.get('/name?="..."', (req, res)=>{
    res.send('soy post /country')
}) 

router.post('/:countryId/activity/:activityId', async (req, res)=>{ //Aqui estamos generando actividades
    try {
        const {countryId, activityId} = req.params;
        const country = await Country.findByPk(countryId)
        await country.addActivity(activityId)
        res.send(200)
    
} catch (error) {
    res.status(500).json({error: error.message})
}
})




router.post('/', async (req, res)=>{  // Esto es para luego probar la tabla de relacion
    const {name, flags, continents,capital, subregion, area, poblacion} = req.body;
    const newCountry = await Country.create({
        name, flags, continents,capital, subregion, area, poblacion
    })
    res.send(newCountry)
})


router.put('/', (req, res)=>{
    res.send('soy put /country')
}) 
router.delete('/', (req, res)=>{
    res.send('soy delete /country')
}) 

module.exports = router;
