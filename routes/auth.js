const {Router }=require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router= Router();
//Crear un nuevo usuario
router.post('/new',[
    check('name','El nombre e requerido').not().isEmpty(),
    check('email','El email es requerido').isEmail(),
    check('password','la contraseña es requerida').isLength({min:6}),
    validarCampos
]
,crearUsuario);


//Logi de usario
router.post('/',[
    check('email','El emisl es obligatorio').isEmail(),
    check('password','la contraseña es requerida').isLength({min:6}),
    validarCampos
],loginUsuario);

//Validar y revalidar token
router.get('/renew',revalidarToken);
module.exports= router;