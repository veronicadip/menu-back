const{Schema, model} = require('mongoose');

const  RolSchema = Schema({
    rol:{
        type: String,
        required:[true,'EL rol es obligatorio']
    }
})

module.exports=model('Rol', RolSchema);