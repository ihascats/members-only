const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/sign-up', function (req, res) {
  res.render('sign-up-form');
});

router.get('/log-in', function (req, res) {
  res.render('log-in-form');
});

router.post('/sign-up', function (req, res) {
  console.log(req.body);
  res.redirect('/log-in');
});

router.post('/log-in', function (req, res) {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
