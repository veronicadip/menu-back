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
        Pedidos.find(query)
        .skip(desde)
        .limit(limite)
        .populate("usuario","email")
        .populate("menu","nombre"),

    ]);
 //para traer el total de los usuarios
    res.json({
    message:'pedidos realizados',
    total,
    pedidos,

 }); 

};

const pedidosPost = async( req=request, res=response) =>{
    //recibir el cuerpo de la peticion 

    const {usuario,pedido,fecha} =  req.body;
    const data = {
        usuario,
        pedido,
        fecha,
    };
    
    const pedidos = new Pedidos(data); 


//para guardar en la bd
await pedidos.save();

res.status(201).json=({
    pedidos,
    message:"pedido creado correctamente",
});

};
const pedidosPut= async (req=request, res=response) =>{
    const {id}= req.params;

//obtener datos para actualizarlos 
const {pedido}= req.body;


//buscar usuario y actualizarlo
const pedidos = await Pedidos.findByIdAndUpdate(id, pedido,{new:true})   

res.json({
    message:'Usuario actualizado',
    pedidos
});
};

const pedidosDelete= async (req=request, res=response) =>{

    const {id}=req.params;
    const pedidosAutenticado =req.pedidos;

    const pedidos= await Pedidos.findById(id);

    if(!pedidos.estado){
        return res.json({
            message:'pedido ya esta inactivo'
        })
    }
    const pedidosInactivo = await Pedidos.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json({
        message: 'Usuario inactivo',
        pedidosInactivo,
        pedidosAutenticado
    })
}

module.exports ={pedidosGet,pedidosPost,pedidosPut,pedidosDelete}