const express = require('express');
const {
  get_sign_up,
  get_log_in,
  post_sign_up,
  post_log_in,
  get_log_out,
  signupValidate,
} = require('../controllers/index-controllers');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/sign-up', get_sign_up);

router.get('/log-in', get_log_in);

router.post('/sign-up', signupValidate, post_sign_up);

router.post('/log-in', post_log_in);

router.get('/log-out', get_log_out);

module.exports = router;
