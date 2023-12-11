const { Router } = require("express");
const {Activity} = require("../db");
const router = Router();


const getActivity = async (req, res)=>{  //Aqui estamos listando todas las actividades cargadas
    const activity = await Activity.findAll()
    res.send(activity)
}


//! POR AHORA NO SE USA PERO CAPAZ QUE DESPUES LO NECESITE
// router.put('/', (req, res)=>{
//     res.send('soy put /activity')
// }) 
// router.delete('/', (req, res)=>{
//     res.send('soy delete /activity')
// }) 

module.exports = getActivity;
