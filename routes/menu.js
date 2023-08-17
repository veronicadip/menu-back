const { Router } = require('express');
const {check} = require('express-validator')
const {menuGet,menuPost,menuPut,menuDelete}= require ('../controllers/menu');
const { emailExiste, esRolValido, menuExiste } = require('../helpers/db validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar_jwt');
const { esAdminRole } = require('../middlewares/validar_roles');
const router = Router();

router.get ('/', menuGet);

router.post ('/', [  check('rol').custom(esRolValido),
                    validarCampos
                    ],
menuPost);

router.put ('/:id', [
    validarJWT,
    check("rol").custom(esRolValido),
    validarCampos,
],
menuPut);

router.delete ('/:id', [
    validarJWT,
    esAdminRole,
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(usuarioExiste),
    validarCampos
    

],usuariosDelete);


module.exports= router;
