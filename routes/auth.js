const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {check} = require('express-validator');
const auth = require('../middleware/auth');
// Crea un jwt para el usuario
// api/auth
router.post('/',
    [
       check('email','Agregar un email valido').isEmail()
    ],
    authController.autenticarUsuario
);

// Obtiene el usuario auntenticado
router.get('/',
    auth,
    authController.usuarioAutenticado
);
module.exports = router;