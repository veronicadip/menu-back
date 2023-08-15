const { Schema,model } = require("mongoose");

const PedidosSchema = Schema ({
    usuario: {type:Schema.Types.ObjectId,
              ref: "Usuario",
              require:true,
            },
    pedido: {type:Schema.Types.ObjectId,
             ref:"Menu",
             require:true,

    },
    estado : {
        type: Boolean,
        require:true,
        default:true,
    },
    fecha: {type: String}        
})

module.exports=model('Pedidos', Schema)