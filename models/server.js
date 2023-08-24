const express = require('express');
const cors= require('cors');
const { dbConnection } = require('../database/config');
//const(dbConnection)

class Server{
    constructor(){
        this.app= express();
        this.port= process.env.PORT;
        this.authPath='/api/auth';
        this.usuariosPath='/api/usuario';
        this.pedidosPath='/api/pedidos';
        this.menuPath='/api/menu';
        this.categoriaPath='/api/categoria';

        //conectar a la base de datos
        this.conectarDB();
        
        
        
        //middleWare
        this.middlewares();

        //funcion para as rutas
        this.routes();

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
    this.app.use(this.authPath, require('../routes/auth'));
    this.app.use(this.usuariosPath,require('../routes/usuario'));
    this.app.use(this.categoriaPath,require('../routes/categoria'));
    this.app.use(this.menuPath,require('../routes/menu'));
    this.app.use(this.pedidosPath,require('../routes/pedidos'));
}
listen(){
    this.app.listen(this.port,()=>{
        console.log('Server online en :',this.port);
    }
    
    )
}

}
module.exports=Server;
