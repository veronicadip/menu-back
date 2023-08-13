const { Router } = require('express');
const {check} = require('express-validator');
const {usuariosGet,usuariosPost,usuariosPut,usuariosDelete}= require ('../controllers/usuario');
const { emailExiste, esRolValido, usuarioExiste } = require('../helpers/db validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar_jwt');
const { esAdminRole } = require('../middlewares/validar_roles');
const router = Router();

router.get ('/', usuariosGet);

router.post ('/', [check ('nickname', 'El nombre es requerido').notEmpty(),
                    check('password', 'La contraseña tiene que tener minimo 8 caracteres').isLength({min:6}),
                    check('mail').custom(emailExiste),
                    check('rol').custom(esRolValido),
                    validarCampos,
                    ],
usuariosPost);

router.put ('/:id', [
            validarJWT,
            check("id", "no es un id valido").isMongoId(),
            check("id").custom(usuarioExiste),
            check("rol").custom(esRolValido),
            validarCampos,
],
 usuariosPut);

router.delete ('/:id', [
    validarJWT,
    esAdminRole,
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(usuarioExiste),
    validarCampos,
],usuariosDelete);


module.exports= router;