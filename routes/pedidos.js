const { Router } = require('express');
const {check} = require('express-validator');
const{pedidosGet} = require ('../controllers/pedidos')
const { emailExiste, esRolValido, usuarioExiste } = require('../helpers/db validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar_jwt');
const { esAdminRole } = require('../middlewares/validar_roles');