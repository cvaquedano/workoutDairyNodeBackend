const CheckPoint = require('../models/CheckPoint');
const {validationResult} = require('express-validator');

exports.CrearCheckPoint = async (req, res) =>{

    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    try {

        const checkPoint = new CheckPoint(req.body);
        checkPoint.creador =req.usuario.id;
        await checkPoint.save();
        res.json(checkPoint);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.obtenerCheckPoints = async (req, res) =>{

    try {
        const checkPoints = await CheckPoint.find({creador : req.usuario.id}).sort({registro: -1});

        res.json({checkPoints});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.actualizarCheckPoint = async (req, res) =>{

    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    const {cintura, peso, grasa } = req.body;
    const nuevoCheckPoint={};

    nuevoCheckPoint.cintura = cintura;
    nuevoCheckPoint.peso = peso;
    nuevoCheckPoint.grasa = grasa;

    try {
        let checkPoint = await CheckPoint.findById(req.params.id);

        if(!checkPoint){
            return res.status(404).json({msg: 'CheckPoint no encontrado'})
        }
        if(checkPoint.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'})
        }

        checkPoint = await CheckPoint.findByIdAndUpdate({_id: req.params.id }, {$set : nuevoCheckPoint}, {new: true});

        res.json({checkPoint});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.eliminarCheckPoint = async (req, res) =>{


    try
    {
        let checkPoint = await CheckPoint.findById(req.params.id);

        if(!checkPoint){
            return res.status(404).json({msg: 'CheckPoint no encontrado'})
        }
        if(checkPoint.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'})
        }

        await CheckPoint.findOneAndRemove({_id: req.params.id });

        res.json({msg: 'CheckPoint Eliminado'});

    } catch (error) {

        console.log(error);
        res.status(500).send('Hubo un error');
    }

}