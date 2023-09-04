const{Router} = require ('express');
const {check} = require ('express-validator');
const {validarCampos} = require ('../middlewares/validar_campos');
const {login} = require('../controllers/auth');

const router = Router();

router.post('/login',[
    check("mail", "el correo no es valido").isEmail(),
    check("password", "la contraseña es obligatoria").notEmpty(),
    validarCampos
],
login

);

module.exports = router;