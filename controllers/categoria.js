const { response, request }= require('express');
const Categoria =require('../models/categoria');

const categoriaGet =async( req = request, res= response) =>{
    //paginacion 
   const { desde=0, limite=5} = req.query;
    const query= {estado :true}

    const [total, categoria] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .skip(desde)
        .limit(limite)
    ]);
    //para traer el total de los usuarios
    res.json({
        message:'Categoria',
        total,
        Categoria,
     }); 
     
};
const categoriaPost = async( req=request, res=response) =>{
    //recibir el cuerpo de la peticion 

    const {nombre} =  req.body;
    const data = {
        nombre,
        
    };
    
    const categoria = new Categoria(data);
    //para guardar en la bd
await categoria.save();

res.status(201).json=({
    categoria,
    message:"categoria creado correctamente",
});
};
const categoriaPut= async (req=request, res=response) =>{
    const {id}= req.params;

//obtener datos para actualizarlos 
const { ...resto}= req.body;
//buscar usuario y actualizarlo
const categoria = await Categoria.findByIdAndUpdate(id, resto,{new:true})   

res.json({
    message:'Producto actualizado',
    categoria
});
};
const categoriaDelete= async (req=request, res=response) =>{

    const {id}=req.params;
    const categoriaAutenticado =req.menu;

    const categoria= await Categoria.findById(id);

    if(!categoria.estado){
        return res.json({
            message:'Categoria ya esta inactivo'
        })
    }
    const categoriaInactivo = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json({
        message: 'Categoria inactivo',
        categoriaInactivo,
        categoriaAutenticado
    });
};
module.exports ={categoriaGet,categoriaPost,categoriaPut,categoriaDelete}
