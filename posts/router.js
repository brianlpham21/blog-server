'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {Post} = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

// Get Posts (Most Recent)

router.get('/', (req, res) => {
  Post
    .find()
    .sort({'date': -1})
    .then(posts => res.json(posts.map(post => post.serialize())))
    .catch(err => res.status(500).json({message: 'Internal Server Error'})
  );
});

// Get Select Post

router.get('/:id', (req, res) => {
  Post
    .find()
    .then(posts => posts.filter(post => post.id === req.params.id))
    .then(posts => res.json(posts.map(post => post.serialize())))
    .catch(err => res.status(500).json({message: 'Internal Server Error'})
  );
});

// Create a New Post

router.post('/', jsonParser, (req, res) => {
  Post
    .create({
      title: req.body.title,
      date: Date.now(),
      category: req.body.category,
      photoLink: req.body.photoLink,
      photoCaption: req.body.photoCaption,
      text: req.body.text
    })
    .then(post => res.status(201).json(post.serialize()))
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'Internal Server Error'});
    });
});

// Edit a Post

router.patch('/:id', jsonParser, (req, res) => {
  Post
    .findByIdAndUpdate(req.params.id, {$set: {
      'title': req.body.title,
      'category': req.body.category,
      'photoLink': req.body.photoLink,
      'photoCaption': req.body.photoCaption,
      'text': req.body.text
      }
    })
    .then(post => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal Server Error'}))
});

// Delete a Post

router.delete('/:id', (req, res) => {
  Post
    .findByIdAndRemove(req.params.id)
    .then(posts => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal Server Error'})
  );
});

module.exports = {router};
