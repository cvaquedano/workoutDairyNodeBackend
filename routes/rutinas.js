const express = require('express');
const router = express.Router();
const rutinaController = require('../controllers/rutinaController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

router.post('/',
    auth,
    [
        check('nombre','El nombre es obligatorio').notEmpty(),
        check('series','Las series debe ser un numero valido').isNumeric(),
        check('repeticiones','Las repeticiones debe ser un numero valido').isNumeric(),
    ],
    rutinaController.CrearRutina
);

router.get('/',
    auth,
    rutinaController.obtenerRutinas
);

router.put('/:id',
    auth,
    [
        check('nombre','El nombre es obligatorio').notEmpty(),
        check('series','Las series debe ser un numero valido').isNumeric(),
        check('repeticiones','Las repeticiones debe ser un numero valido').isNumeric(),
    ],
    rutinaController.actualizarRutina
);

router.delete('/:id',
    auth,
    rutinaController.eliminarRutina
);

module.exports = router;