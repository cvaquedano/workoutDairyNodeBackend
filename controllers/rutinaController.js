const Rutina = require('../models/Rutina');
const {validationResult} = require('express-validator');

exports.CrearRutina = async (req, res) =>{

    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    try {

        const rutina = new Rutina(req.body);
        rutina.creador =req.usuario.id;
        await rutina.save();
        res.json(rutina);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.obtenerRutinas = async (req, res) =>{

    try {
        const rutinas = await Rutina.find({creador : req.usuario.id}).sort({creado: -1});

        res.json({rutinas});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.actualizarRutina = async (req, res) =>{

    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    const {nombre, series, repeticiones } = req.body;
    const nuevoRutina={};

    nuevoRutina.nombre = nombre;
    nuevoRutina.series = series;
    nuevoRutina.repeticiones = repeticiones;

    try {
        let rutina = await Rutina.findById(req.params.id);

        if(!rutina){
            return res.status(404).json({msg: 'Rutina no encontrado'})
        }
        if(rutina.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'})
        }

        rutina = await Rutina.findByIdAndUpdate({_id: req.params.id }, {$set : nuevoRutina}, {new: true});

        res.json({rutina});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.eliminarRutina = async (req, res) =>{


    try
    {
        let rutina = await Rutina.findById(req.params.id);

        if(!rutina){
            return res.status(404).json({msg: 'Rutina no encontrado'})
        }
        if(rutina.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'})
        }

        await Rutina.findOneAndRemove({_id: req.params.id });

        res.json({msg: 'Rutina Eliminado'});

    } catch (error) {

        console.log(error);
        res.status(500).send('Hubo un error');
    }

}