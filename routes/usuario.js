const { Router } = require('express');
const {check} = require('express-validator')
const {usuariosGet,usuariosPost,usuariosPut,usuariosDelete}= require ('../controllers/usuario');
const { emaiExiste, esRolValido } = require('../helpers/db validator');
const { validarCampos } = require('../middlewares/validar_campos');
const router = Router();

router.get ('/', usuariosGet);

router.post ('/', [check ('nickname', 'El nombre es requerido').notEmpty(),
                    check('password', 'La contraseña tiene que tener minimo 8 caracteres').isLength({min:6}),
                    check('mail').custom(emaiExiste),
                    check('rol').custom(esRolValido),
                    validarCampos
                    ],
usuariosPost);

router.put ('/:id', usuariosPut);

router.delete ('/:id', usuariosDelete);


module.exports= router;