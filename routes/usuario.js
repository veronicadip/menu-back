const { Router } = require('express');
const {usuariosGet,usuariosPost,usuariosPut,usuariosDelete}= require('../cotrollers/usuario')
const router = Router();

router.get ('./', usuariosGet);
router.post ('./', usuariosPost);
router.put ('./:id', usuariosPut);
router.delete ('./:id', usuariosDelete);


module.exports= router;