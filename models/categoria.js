const { Schema,model } = require("mongoose");

const CategoriaSchema = Schema ({
    nombre: {type:String,require:true, unique:true
            },
    
    estado : {
        type: Boolean,
        require:true,
        default:true,
    },
     
})

module.exports=model('Categoria', CategoriaSchema);