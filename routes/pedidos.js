const { Router } = require ('express');
const {check} = require('express-validator');
const{pedidosGet,pedidosGetId,pedidosPost,pedidosPut,pedidosDelete} = require ('../controllers/pedidos')
const { usuarioExiste } = require('../helpers/db validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar_jwt');
const { esAdminRole } = require('../middlewares/validar_roles');

const router = Router();

router.get ('/',[validarJWT,
                 esAdminRole,
                 validarCampos,   
                
], pedidosGet);

router.get ('/:id',[validarJWT,
           //check("id").custom(usuarioExiste),
           validarCampos,
],pedidosGetId);

router.post ('/', [validarJWT,
                  check("id").custom(usuarioExiste),
                  validarCampos,
                    ], pedidosPost);

router.put ('/:id',[validarJWT,
    //check("id").custom(usuarioExiste), 
], pedidosPut);

router.delete ('/:id', [validarJWT,esAdminRole,validarCampos,],pedidosDelete);


module.exports= router;