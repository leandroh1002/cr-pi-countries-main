const { Router, response } = require("express");
const { Op } = require("sequelize");
const {Country, Activity} = require("../db")
const axios = require('axios')
const router = Router();

const getCountry = async(req, res)=>{ //buscando a todos los agregados de la base de datos y probar los enlaces de las tablas de relacion
    const country = await Country.findAll({
        include: Activity
    })
    res.send(country)
}


// //? Esta ruta es para el componente Detail
// router.get('/:idPais', async (req, res) => {
//     const { idPais } = req.params;
  
//     try {
//       const country = await Country.findOne({
//         where: { id: idPais },
//         //include: [{ model: Activity, as: 'activities' }],
//       });
  
//       if (country) {
//         res.json(country);
//       } else {
//         res.status(404).json({ message: 'País no encontrado.' });
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Error al obtener el país.' });
//     }
//   });

// //? Esta ruta es para el componente SearchBar
// router.get('/', async (req, res) => { //! Consultar sobre como debe quedar la ruta
//   const { name } = req.query;
  
//   try {
//     const countries = await Country.findAll({
//       where: {
//         name: {
//           [Op.iLike]: `%${name}%`, // Búsqueda insensible a mayúsculas y minúsculas
//         },
//       },
//     });
//     if (countries.length > 0) {
//       res.json(countries);
//     } else {
//       res.status(404).json({ message: 'No se encontraron países con ese nombre.' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error al buscar países por nombre.' });
//   }
// });


// //*Aqui estamos generando actividades
// router.post('/:countryId/activity/:activityId', async (req, res)=>{ 
//     try {
//         const {countryId, activityId} = req.params;
//         const country = await Country.findByPk(countryId)
//         await country.addActivity(activityId)
//         res.send(200)
// } catch (error) {
//     res.status(500).json({error: error.message})
// }
// })




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

module.exports = getCountry;
