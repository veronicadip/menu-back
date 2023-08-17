const { Router } = require('express');
const {check} = require('express-validator');
const{pedidosGet,pedidosPost,pedidosPut,pedidosDelete} = require ('../controllers/pedidos')
const { emailExiste, esRolValido, usuarioExiste } = require('../helpers/db validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar_jwt');
const { esAdminRole } = require('../middlewares/validar_roles');

const router = Router();

router.get ('/',[validarJWT,
                check("id").custom(usuarioExiste),
], pedidosGet);


router.post ('/', pedidosPost);



router.put ('/', pedidosPut);


router.delete ('/', pedidosDelete);
