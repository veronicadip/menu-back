const { Router } = require('express');
const {check} = require('express-validator')
const {categoriaGet,categoriaPost,categoriaPut,categoriaDelete}= require ('../controllers/categoria');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar_jwt');
const { esAdminRole } = require('../middlewares/validar_roles');
const router = Router();

router.get ('/', categoriaGet);

router.post ('/', [ validarJWT,
                   esAdminRole,
     
                    validarCampos
                    ],
categoriaPost);
router.put ('/:id', [
             validarJWT,
             esAdminRole,
            validarCampos,
],
categoriaPut);

router.delete ('/:id', [
    validarJWT,
    esAdminRole,
    check("id", "No es un id valido").isMongoId(),
   
    validarCampos
    

],categoriaDelete);


module.exports= router;
