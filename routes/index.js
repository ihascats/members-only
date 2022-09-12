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
  get_user,
  limited_access,
  message_edit,
} = require('../controllers/index-controllers');
const router = express.Router();

router.get('/', get_index);

router.post('/new-message', limited_access, message_validate, post_new_message);

router.get('/sign-up', logged_in_access, get_sign_up);

router.get('/log-in', logged_in_access, get_log_in);

router.post('/sign-up', signupValidate, post_sign_up);

router.post('/log-in', post_log_in);

router.get('/log-out', limited_access, get_log_out);

router.get(`/user-:id`, limited_access, get_user);

router.post('/message/edit/:id', limited_access, message_edit);

router.delete('/message/delete/:id', limited_access, message_delete);

module.exports = router;
