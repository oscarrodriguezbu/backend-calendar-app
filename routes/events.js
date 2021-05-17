/* 
Rutas de eventos /events
host http://localhost:4000/api/events/
*/

const { Router } = require('express'); //Version desestructurada
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, } = require('../middlewares/validar-jwt');

const { actualizarEventos, eliminarEventos, getEventos, crearEvento } = require('../controllers/events');

const router = Router();

//todo lo que esté debajo va a tener validarJWT, si hay una ruta publica pues se coloca antes de esta linea
router.use(validarJWT);


//CRUD EVENTOS
router.get('/', getEventos);

router.post('/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),            
        check('end', 'La fecha final es obligatoria').custom(isDate),
            
        validarCampos
    ],
    crearEvento);

router.put('/:id', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),            
    check('end', 'La fecha final es obligatoria').custom(isDate),
        
    validarCampos
],
actualizarEventos);

router.delete('/:id', eliminarEventos);





//exportacion
module.exports = router;