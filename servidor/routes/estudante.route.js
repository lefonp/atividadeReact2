const express = require('express');
const app = express();
const estudanteRoutes = express.Router();

let Estudante = require('../model/estudante');

// api to add estudante
estudanteRoutes.route('/add').post(function (req, res) {
  let estudante = new Estudante(req.body);
  estudante.save()
  .then(estudante => {
    res.status(200).json({'status': 'success','mssg': 'estudante added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get estudantes
estudanteRoutes.route('/').get(function (req, res) {
  Estudante.find(function (err, estudantes){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','estudantes': estudantes});
    }
  });
});

// api to get estudante
estudanteRoutes.route('/estudante/:id').get(function (req, res) {
  let id = req.params.id;
  Estudante.findById(id, function (err, estudante){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','estudante': estudante});
    }
  });
});

// api to update route
estudanteRoutes.route('/update/:id').put(function (req, res) {
    Estudante.findById(req.params.id, function(err, estudante) {
    if (!estudante){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        estudante.nome = req.body.nome;
        estudante.CPF = req.body.CPF;
        estudante.numero = req.body.numero;

        estudante.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
estudanteRoutes.route('/delete/:id').delete(function (req, res) {
  Estudante.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = estudanteRoutes;