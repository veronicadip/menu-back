const { response, request }= require('express');
const {validationResults}= require('express-validator');
const Usuario =require('../models/usuarios');

const usuariosGet= async( req = request, res= response) =>{
    //paginacion 
   const { desde=0, limite=5} = req.query;
    const query= {estado :true}

    const [total,usuario ] = await promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(desde).limit(limite)

    ])
 //para traer el total de los usuarios
    res.json({
    mensaje:'usuarios obtenidos',
    total,
    usuarios

 }) 

}

const usuariosPost= async( req=request, res=response) =>{
    //recibir el cuerpo de la peticion 

    const datos = req.body;
    const {nickname,mail,celular,direccion,password,rol} = datos;
    const usuario =new Usuario({nickname,mail,celular,direccion,password,rol });


//para guardar en la bd
await usuario.save();

res.json=({
    usuario,
    message:"usaurio creado correctamente",
})

}