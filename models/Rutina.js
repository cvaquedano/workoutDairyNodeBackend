const mongoose = require('mongoose');

const RutinasSchema = mongoose.Schema({

    nombre:{
        type: String,
        required: true,
        trim: true
    },
    series:{
        type: Number,
        default: 0
    },
    repeticiones: {
        type: Number,
        default: 0
    },
    creador:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    registro: {
        type: Date,
       default: Date.now()
    }
});

module.exports = mongoose.model('Rutina', RutinasSchema);