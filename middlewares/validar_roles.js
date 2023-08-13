const{request, response} = require('express');

const esAdminRole = (req=request, res=response, next)=> {
    if(!req.usuario){
        //no validamos el token antes 
        return res.status(500).json({
            msg:"Se quiere validar algo sin validar el token"
        })
    }
    const{rol,nombre} = req.usuario

    if(rol !== "ADMIN_ROLE"){
        return res.status(400).json({
            msg: "el usuario no es un administrador"
        })
    }
    next();
}

module.exports={esAdminRole}