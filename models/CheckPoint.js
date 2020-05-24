const mongoose = require('mongoose');

const CheckPointSchema = mongoose.Schema({

    cintura:{
        type: Number,
        default: 0
    },
    peso:{
        type: Number,
        default: 0
    },
    grasa: {
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

module.exports = mongoose.model('CheckPoint', CheckPointSchema);