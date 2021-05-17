/* 
Rutas de usuarios /Auth
host http://localhost:4000/api/auth/
*/

/* const express = require('express');
const router = express.Router */
const { Router } = require('express'); //Version desestructurada
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');

const router = Router();



//creacion de endpoints:

//register
/* router.post('/new', (request, response)=>{ //tipo de peticion es un get o post en este caso
    //console.log('Se requiere: /');
    response.json({
        ok:true,
        msg: 'register'
    })
})
 */


//registrar
router.post(
    '/new',
    [ //midlewares: //si hay mas midlewares se deben mandar como un arreglo 
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email').not().isEmpty().withMessage('El email es obligatorio')
            .isEmail().withMessage('El email es incorrecto'),
        // check('password', 'El password es obligatorio').not().isEmpty(),
        //check('password', 'El password debe tener al menos 6 caracteres').isLength({min:6}),
        /*  check('password', 'El password debe tener seis caracteres, incluiyendo una letra mayúscula, un carácter especial y caracteres alfanuméricos')
            .matches(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,}$/), */
        check('password')
            .not().isEmpty().withMessage('El password es obligatorio')
            .isLength({ min: 8 }).withMessage('El password debe tener ocho caracteres')
            .matches('[0-9]').withMessage('El password debe contener al menos un numero')
            .matches('[a-z]').withMessage('El password debe contener al menos una letra minuscula')
            .matches('[A-Z]').withMessage('El password debe contener al menos una letra mayuscula')
            .matches(/^(?=(.*[\W]){1,})/).withMessage('El password debe contener al menos una caracter especial'),
        check('password2')
            .not().isEmpty().withMessage('Confirmar Password no puede ir vacío')
            .custom((value, { req }) => value === req.body.password).withMessage('Las contraseñas son diferentes'),     
        //check('password2', 'Las contraseñas son diferentes').equals('password2'),
        //check('password2', 'Las contraseñas son diferentes').equals('123456Ahh*a'),
        //check('password', 'Las contraseñas son diferentes').matches('password2'),
        // check('password', 'Las contraseñas son diferentes').equals(password2)

        validarCampos
    ],
    crearUsuario); //console.log(crearUsuario);
//console.log(check('password2', 'Las contraseñas son diferentes').equals('password'));

//login
router.post('/',
    [ //midlewares:  
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'El email es incorrecto').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    loginUsuario);

//renew del tokken
router.get('/renew', validarJWT, revalidarToken); 


//exportacion
module.exports = router;