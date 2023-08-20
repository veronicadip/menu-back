const { Schema,model } = require("mongoose");
//const { removeAllListeners } = require("nodemon");

const UsuarioSchema = Schema({
    nickname:{type: String, required:[true,'El nombre es obligatorio'] } ,
    mail:{type: String, required:[true,'El correo es obligatorio'],unique:true },
    celular:{type: String},
    direccion:{type: String},
    password:{type: String, required:[true,'El contraseña es obligatorio']},
    rol:{type: String, required:true}, 
    estado:{type: Boolean, default:true},
    
});

//quitar datos extra en la respuesta del json 

/*UsuarioSchema.methods.toJSON = function(){
    const{__v, password, _id, ...usuario} = this.toObject();
    return usuario;
}*/
 
module.exports=model('Usuario',UsuarioSchema)