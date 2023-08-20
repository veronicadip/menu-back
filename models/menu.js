const { Schema,model } = require("mongoose");
//const { removeAllListeners } = require("nodemon");

const MenuSchema = Schema({
    nombre:{type: String, required:[true,'El nombre es obligatorio'],unique:true, } ,
    precio:{type: Number, default:0,},
    categoria:{type: String},
    descripcion:{type: String},
    foto:{type: String},
    //rol:{type: String, required:true}, 
    estado:{type: Boolean, default:true},
    
})
 
module.exports=model('Menu',MenuSchema)