const { Router, response } = require("express");
const {Country, Activity} = require("../db")
const axios = require('axios')
const router = Router();

router.get('/', async(req, res)=>{ 
    let countryPromiseApi = axios.get('http://localhost:5000/countries/')
    let countryPromiseDb = Country.findAll({
        include: Activity
    })
    Promise.all([
        countryPromiseApi, //respuesta de la api
        countryPromiseDb // respuesta de la base de datos
    ])
    .then((respuesta) =>{
        const [countryApi, countryDb] = respuesta
        let filteredCountryApi = countryApi.data.map((countryAtribute)=>{
            return{ //traer solo los datos que necesito para mostrar en el front
                id: countryAtribute.fifa,
                name: countryAtribute.name.common,
            }
        })
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

// router.get('/:idPais', async (req, res)=>{
//     try {
//         const {idPais} = req.params
//         const URL = `http://localhost:5000/countries/`;
//         let pais
//         response = (await axios.get(URL + idPais))
//         pais = response.data
//         return res.send(pais)
//     } catch (error) {
//         return res.status(500).send(error.message)
// }}) 

router.get('/:idPais', async (req, res) => {
    const { idPais } = req.params;
  
    try {
      const country = await Country.findOne({
        where: { id: idPais },
        //include: [{ model: Activity, as: 'activities' }],
      });
  
      if (country) {
        res.json(country);
      } else {
        res.status(404).json({ message: 'País no encontrado.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el país.' });
    }
  });


router.get('/countries/name', async (req, res) => {
    const { name } = req.query;
    try {
      const countries = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`, // Case-insensitive search
          },
        },
      });
      if (countries.length > 0) {
        res.json(countries);
      } else {
        res.status(404).json({ message: 'No se encontraron países con ese nombre.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al buscar países por nombre.' });
    }
}); 



//Aqui estamos generando actividades
router.post('/:countryId/activity/:activityId', async (req, res)=>{ 
    try {
        const {countryId, activityId} = req.params;
        const country = await Country.findByPk(countryId)
        await country.addActivity(activityId)
        res.send(200)
} catch (error) {
    res.status(500).json({error: error.message})
}
})




// router.post('/', async (req, res)=>{  // Esto es para luego probar la tabla de relacion
//     const {name, flags, continents,capital, subregion, area, poblacion} = req.body;
//     const newCountry = await Country.create({
//         name, flags, continents,capital, subregion, area, poblacion
//     })
//     res.send(newCountry)
// })


// router.put('/', (req, res)=>{
//     res.send('soy put /country')
// }) 
// router.delete('/', (req, res)=>{
//     res.send('soy delete /country')
// }) 

module.exports = router;