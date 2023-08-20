const {request,response} = require('express');
const jwt= require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = async( req=request, res=response, next) => {
    const token = req.header('x-token');

    //preguntar si enviaron el token
    if(!token){
        return res.json(401).json({
            msg: "No hay token en la peticion"
    })
    }
    try {
        //verificamos el token y obtenemos el id del usuario 
        const {uid} =jwt.verify(token,process.env.SECRETORPRIVATEKEY)
        
        //OBTENER LOS DATOS DEL USAURIO AUTENTICADO 
        const usuario = await Usuario.findById(uid)
          
        //validar si el usuario existe 
        if(!usuario){
            return res.status(401).json({
                msg: "Token no vaido-usuario no existe "
            })
        };
        //verificar si el usuario esta activo 
        if(!usuario.estado){
            return res.status(401).json({
                msg:"token no valido- usuario inactivo"
            })
        }

        req.usuario= usuario;

        next();


    } catch (error){
        console.log(error)
        res.status(401).json({
            msg:"Token no es valido"
        })
    }
}


module.exports={ validarJWT}