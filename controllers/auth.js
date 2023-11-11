const {response, request} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require ('../models/usuario')
const {generarJWT} = require('../helpers/generarJWT');

const login = async(req=request, res=response)=> {
    const{mail,password}= req.body;

    try{
        const usuario= await Usuario.findOne({mail});

        //verificar si el correo existe 
        if(!usuario){
            return res.status(400).json({
                msg: "correo o password incorrectos",
            })
        }

        //verificar que el usuario este activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:"correo o usuario incorrecto/ usuario inactivo",
            })
        }

        //verificar la contraseña 

        const validarPassword = bcrypt.compareSync(password, usuario.password);
        if(!validarPassword){
            return res.status(400).json({
                msg:"correo o password incorrectos",
            })
        }

        //generar el token

        const token=await generarJWT(usuario.id);

        res.json({
            msg:"login ok",
            //usuario
            usuario,
            token
        })
    } catch(error){
        //console.log(error)
        return res.status(500).json({
            msg:"hable con el administrador"
        })
    }
}

module.exports={
    login
}