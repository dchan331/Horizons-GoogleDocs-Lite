// NPM Packages
const express = require('express');
const router = express.Router();

// Local Imports
const User = require('./models/user');
const Document = require('./models/document');

router.post('/register', function (req, res) {
  console.log(req.body);
  User.register(req.body.name, req.body.username, req.body.password, console.log);

  res.send('Successfully Registered!');
});

router.post('/document', function (req, res) {
  console.log('user', req.user)
  const newDocument = new Document({
    name: req.body.name,
    body: req.body.body,
    owner: req.user
  })
  newDocument.save((err) => {
    console.log('Error creating Document', err)
  })
  res.send('Added new Document')
})

router.get('/document', function (req, res) {
  Document.find({},function(err, result){
    res.send(result)
  })
})

router.get('/success', function(req, res) {
  res.json({authenticated: true, user: req.user});
});

router.get('/failed', function(req, res) {
  res.json({authenticated: false});
});

module.exports = router;