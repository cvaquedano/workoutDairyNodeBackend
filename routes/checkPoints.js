const express = require('express');
const router = express.Router();
const checkPointController = require('../controllers/checkPointController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

router.post('/',
    auth,
    [
        check('cintura','La cintura debe ser un numero valido').isNumeric(),
        check('peso','El peso debe ser un numero valido').isNumeric(),
        check('grasa','La grasa debe ser un numero valido').isNumeric(),
    ],
    checkPointController.CrearCheckPoint
);

router.get('/',
    auth,
    checkPointController.obtenerCheckPoints
);

router.put('/:id',
    auth,
    [
        check('cintura','La cintura debe ser un numero valido').isNumeric(),
        check('peso','El peso debe ser un numero valido').isNumeric(),
        check('grasa','La grasa debe ser un numero valido').isNumeric(),
    ],
    checkPointController.actualizarCheckPoint
);

router.delete('/:id',
    auth,
    checkPointController.eliminarCheckPoint
);

module.exports = router;