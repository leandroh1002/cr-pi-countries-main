const { Router } = require("express");
const {Activity} = require("../db");
const Country = require("../models/Country");
const router = Router();



router.get('/', async (req, res)=>{  //Aqui estamos listando todas las actividades cargadas
    const activity = await Activity.findAll()
    res.send(activity)
}) 
router.post('/', async (req, res)=>{ //Aqui estamos generando actividades
    const {name, dificult, duration,temp} = req.body;
    const newActivity = await Activity.create({
        name, dificult, duration,temp
    })
    res.send(newActivity)
})



//! POR AHORA NO SE USA PERO CAPAZ QUE DESPUES LO NECESITE
// router.put('/', (req, res)=>{
//     res.send('soy put /activity')
// }) 
// router.delete('/', (req, res)=>{
//     res.send('soy delete /activity')
// }) 

module.exports = router;
