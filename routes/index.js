const express = require('express');
const {
  get_sign_up,
  get_log_in,
  post_sign_up,
  post_log_in,
  get_log_out,
  signupValidate,
  logged_in_access,
  post_new_message,
  get_index,
  message_delete,
  message_validate,
} = require('../controllers/index-controllers');
const router = express.Router();

router.get('/', get_index);

router.post('/new-message', message_validate, post_new_message);

router.get('/sign-up', logged_in_access, get_sign_up);

router.get('/log-in', logged_in_access, get_log_in);

router.post('/sign-up', signupValidate, post_sign_up);

router.post('/log-in', post_log_in);

router.get('/log-out', get_log_out);

router.delete('/message/delete/:id', message_delete);

module.exports = router;
