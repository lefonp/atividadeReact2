const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Estudante = new Schema({
  nome: {
    type: String
  },
  CPF: {
    type: Number
  },
  numero: {
    type: Number
  },
  matricula: {
    type: String
  }
},{
    collection: 'Estudante'
});

module.exports = mongoose.model('Estudante', Estudante);