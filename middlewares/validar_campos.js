const {validationResults} = require('express-validator');

const validarCampos =( req, res,next) => {
    const errors = validationResults(req)
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

next();

}

module.exports={validarCampos}