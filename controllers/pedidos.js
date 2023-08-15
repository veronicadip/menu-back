const { response, request }= require('express');
const { validationResult }= require('express-validator');
const bcrypt = require('bcryptjs');
const Pedidos =require('../models/pedidos');


const pedidosGet =async( req = request, res= response) =>{
    //paginacion 
   const { desde=0, limite=5} = req.query;
    const query= {estado :true}

    const [total, pedidos] = await Promise.all([
        Pedidos.countDocuments(query),
        Pedidos.find(query).skip(desde).limit(limite)

    ])
 //para traer el total de los usuarios
    res.json({
    message:'pedidos realizados',
    total,
    pedidos

 }) 

}

module.exports ={pedidosGet,}