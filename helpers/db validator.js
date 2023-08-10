const Usuario = require('../models/usuario');

//validar email 

const emaiExiste= async(mail)=>{

    const existeEmail = await Usuario.findOne({mail})
    if (existeEmail) {
        throw new Error (`El correo ${mail} ya existe`);
    }
}

//validar rol
const esRolValido = async (rol)=> {
    const existeRol = await rol.findOne({rol})
    if(!existeRol){
        throw new  Error (`el rol ${rol} no existe en la base de datos`);

    }
}

module.exports= {emaiExiste,esRolValido}