const { response, request }= require('express');
const { validationResult }= require('express-validator');
const bcrypt = require('bcryptjs');
const Usuario =require('../models/usuario');
const usuario = require('../models/usuario');


const usuariosGet= async( req = request, res= response) =>{
    //paginacion 
   const { desde=0, limite=5} = req.query;
    const query= {estado :true}

    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(desde).limit(limite)

    ])
 //para traer el total de los usuarios
    res.json({
    message:'usuarios obtenidos',
    total,
    usuarios

 }) 

}

const usuariosPost= async( req=request, res=response) =>{
    //recibir el cuerpo de la peticion 

    const datos = req.body;
    const {nickname,mail,celular,direccion,password,rol} = datos;
    const usuario =new Usuario({nickname,mail,celular,direccion,password,rol });
//Encriptar la constraseña

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password,salt);
usuario.password= hash;

//para guardar en la bd
await usuario.save();

res.json=({
    usuario,
    message:"usuario creado correctamente",
})

}

const usuariosPut= async (req=request, res=response) =>{
                    const {id}= req.params;
               
               //obtener datos para actualizarlos 
               const{password,mail, ...resto} = req.body;
               
               //si actualizo el password debo cifrarlo
               if(password){
                const salt= bcrypt.gentSaltSync(10);
                resto.password= bcrypt.hashSync(password,salt);
               }
               resto.mail=mail;
               //buscar usuario y actualizarlo
               const usuario =await Usuario.findByIdAndUpdate(id, resto, {new:true})   
               
               res.json({
                    message:'Usuario actualizado',
                    usuario
               })
}

const usuariosDelete= async (req=request, res=response) =>{

                const {id}=req.params;
                const usuarioAutenticado =req.usuario;

                const usuario= await Usuario.findById(id);

                if(!usuario.estado){
                    return res.json({
                        message:'usario ya esta inactivo'
                    })
                }
                const usuarioInactivo = await Usuario.findByIdAndUpdate(id, {estado: false}, {new: true});

                res.json({
                    message: 'Usuario inactivo',
                    usuarioInactivo,
                    usuarioAutenticado
                })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
};