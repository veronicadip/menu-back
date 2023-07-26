const express = require('express');
const cors= require('cors');
const { dbConnection } = require('../database/config');
//const(dbConnection)

class Server{
    constructor(){
        this.app= express();
        this.port= process.env.PORT;
        this.authPath='./api/auth';
        this.usuariosPath='./api/usuarios'
        this.pedidosPath='./api/pedidos'
        this.menuPath='./api/menu'
        this.buscarPath='./api/buscar'

        //conectar a la base de datos
        this.conectarDB;
        
        
        
        //middleWare
        this.middlewares();

        //funcion para as rutas

    }
    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //lo que envia el usuario por el cuerpo de la peticion 
        this.app.use(express.json());

        //definir la carpeta publica
        this.app.use(express.static('public'));
    }


routes (){
    this.app.use(this.usuariosPath,require('../routes/usuarios'));
}
listen(){
    this.app.listen(this.port,()=>{
        console.log('Server online en :',this.port);
    }
    
    )
}

}
module.exports=Server;
