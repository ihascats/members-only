const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/sign-up', function (req, res) {
  res.render('sign-up-form');
});

router.get('/log-in', function (req, res) {
  res.render('log-in-form');
});

router.post(
  '/sign-up',
  [
    body('email').isEmail(),
    body('username').isLength({ min: 3 }),
    body('first_name').isLength({ min: 2 }),
    body('last_name').isLength({ min: 2 }),
  ],
  function (req, res) {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log({ errors: errors.array() });
    }
    // res.redirect('/log-in');
  },
);

router.post('/log-in', function (req, res) {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
