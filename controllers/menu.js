const { response, request }= require('express');
const { validationResult }= require('express-validator');
const bcrypt = require('bcryptjs');
const Menu =require('../models/menu');

const menuGet =async( req = request, res= response) =>{
    //paginacion 
   const { desde=0, limite=5} = req.query;
    const query= {estado :true}

    const [total, pedidos] = await Promise.all([
        menu.countDocuments(query),
        menu.find(query)
        .skip(desde)
        .limit(limite)
        .populate("usuario","nickname")
        .populate("menu","nombre precio"),

    ]);
    //para traer el total de los usuarios
    res.json({
        message:'Menu realizados',
        total,
        pedidos,
    
     }); 
     //obtener menu por su id 
const menuGetId = async ( req=request, res=response,)=> {
    const {id} = req.params;
    const Menu =await menu.findById(id)
    .populate("usuario", "nickname")
    .populate("menu", "nombre precio");


 res.json({
    menu,
     });   
};
const menuPost = async( req=request, res=response) =>{
    //recibir el cuerpo de la peticion 

    const {usuario,pedido,fecha} =  req.body;
    const data = {
        usuario,
        pedido,
        fecha,
    };
    
    const Menu = new menu(data);
    //para guardar en la bd
await pedidos.save();

res.status(201).json=({
    menu,
    message:"Menu creado correctamente",
});
};
const menuPut= async (req=request, res=response) =>{
    const {id}= req.params;

//obtener datos para actualizarlos 
const {menu}= req.body;
//buscar usuario y actualizarlo
const Menu = await menu.findByIdAndUpdate(id, menu,{new:true})   

res.json({
    message:'Usuario actualizado',
    pedidos
});
};
const menuDelete= async (req=request, res=response) =>{

    const {id}=req.params;
    const menuAutenticado =req.menu;

    const pedidos= await menu.findById(id);

    if(!menu.estado){
        return res.json({
            message:'Menu ya esta inactivo'
        })
    }
    const menuInactivo = await menu.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json({
        message: 'Usuario inactivo',
        menuInactivo,
        menuAutenticado
    });
};
module.exports ={menuGet, menuGetId,menuPost,menuPut,menuDelete}
}