const validateObjectId = require('../middleware/validateObjectid');
const asyncMiddleWare = require('../middleware/async');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Genre, valadation} = require('../models/genres');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


router.get('/', asyncMiddleWare( async(req, res) => {
  const genre = await Genre.find().sort({name:-1});
    res.send(genre);
}));
  
router.post('/', auth, asyncMiddleWare( async(req, res) => {
  const { error } = valadation(req.body);
  
  if (error) return res.status(400).send(error.details[0].message);
  let  genre = new Genre({name: req.body.name});
  
  await genre.save();
  res.send(genre);
}));
  
router.put('/:id', [ auth, validateObjectId ], asyncMiddleWare( async(req, res) => {
  const { error } = valadation(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {
    new: true
  });

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
}));
  
router.delete('/:id', [auth, admin, validateObjectId], asyncMiddleWare( async(req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
}));
  
router.get('/:id', validateObjectId, asyncMiddleWare( async(req, res) => {
 
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
  res.send(genre);
}));
  

module.exports = router;                                       



