const { response, request }= require('express');
const Menu =require('../models/menu');

const menuGet =async( req = request, res= response) =>{
    //paginacion 
   const { desde=0, limite=5} = req.query;
    const query= {estado :true}

    const [total, menu] = await Promise.all([
        Menu.countDocuments(query),
        Menu.find(query)
        .skip(desde)
        .limit(limite)
    ]);
    //para traer el total de los usuarios
    res.json({
        message:'Menu realizados',
        total,
        menu,
     }); 
     
};
const menuPost = async( req=request, res=response) =>{
    //recibir el cuerpo de la peticion 

    const {nombre,precio,categoria,descripcion,foto} =  req.body;
    const data = {
        nombre,
        precio,
        categoria,
        descripcion,
        foto,
    };
    
    const menu = new Menu(data);
    //para guardar en la bd
await menu.save();

res.status(201).json=({
    menu,
    message:"Producto creado correctamente",
});
};
const menuPut= async (req=request, res=response) =>{
    const {id}= req.params;

//obtener datos para actualizarlos 
const {menu}= req.body;
//buscar usuario y actualizarlo
const menus = await Menu.findByIdAndUpdate(id, menu,{new:true})   

res.json({
    message:'Producto actualizado',
    menus
});
};
const menuDelete= async (req=request, res=response) =>{

    const {id}=req.params;
    const menuAutenticado =req.menu;

    const menu= await Menu.findById(id);

    if(!menu.estado){
        return res.json({
            message:'Producto ya esta inactivo'
        })
    }
    const menuInactivo = await Menu.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json({
        message: 'Producto inactivo',
        menuInactivo,
        menuAutenticado
    });
};
module.exports ={menuGet,menuPost,menuPut,menuDelete}
