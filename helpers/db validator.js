const Usuario = require ('../models/usuario');
const Rol = require ('../models/rol');

//validar email 

const emailExiste= async(mail)=>{

    const existeEmail = await Usuario.findOne({mail})
    if (existeEmail) {
        throw new Error (`El correo ${mail} ya existe`);
    }
}

//validar rol
const esRolValido = async (rol) => {
    const existeRol = await Rol.findOne({rol})
    if(!existeRol){
        throw new  Error (`el rol ${rol} no existe en la base de datos`);

    }
}

module.exports= {emailExiste,esRolValido}