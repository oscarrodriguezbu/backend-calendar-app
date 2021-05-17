const { response, request } = require('express');
const { validationResult, check } = require('express-validator');

const validarCampos = (request, res = response, next) => { //next es una funcion que hay que llamar si todo el middleware funciona correctamente
    ////manejo de errores:
    
    const errors = validationResult(request);  
    //console.log(request.body);
    //console.log(errors); //para ver que de ahi necesito sacar el msg
    if (!errors.isEmpty()) { //trae lista de errores
        return res.status(400).json({
            ok: false, //esto es algo personalizado que va a servir para faciliar las validaciones
            errors: errors.mapped()
        })
    }
    next();
}

module.exports = {
    validarCampos    
}