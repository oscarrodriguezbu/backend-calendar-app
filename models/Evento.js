const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: { //para ligar al schema del usuario
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});


EventoSchema.method('toJSON', function() { //con esto quito visualmente el __v, ademas el _id lo cambio a id
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Evento', EventoSchema);