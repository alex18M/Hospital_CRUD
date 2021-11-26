const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pacientesSchema = new Schema({
    nombre: String,
    edad: String,
    historial: String,
    medicina: String
})

// crear modelo
const Paciente = mongoose.model('Paciente', pacientesSchema);

module.exports = Paciente;